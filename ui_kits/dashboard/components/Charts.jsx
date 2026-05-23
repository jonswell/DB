/* global React */
// Forma — Charts: ultra-minimal, hand-rendered SVG. No axes, no gridlines.

// ----- helpers ------------------------------------------------------------
function _path(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
}
function _smoothPath(points, smoothing = 0.18) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) * smoothing;
    const c1y = p1[1] + (p2[1] - p0[1]) * smoothing;
    const c2x = p2[0] - (p3[0] - p1[0]) * smoothing;
    const c2y = p2[1] - (p3[1] - p1[1]) * smoothing;
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}
function _stepPath(points) {
  if (!points.length) return "";
  let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` H${points[i][0].toFixed(2)} V${points[i][1].toFixed(2)}`;
  }
  return d;
}
function _seriesPath(points, variant) {
  if (variant === "step") return _stepPath(points);
  if (variant === "linear") return _path(points);
  return _smoothPath(points);
}
function _toPoints(values, w, h, padX = 0, padY = 6) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;
  return values.map((v, i) => [
    padX + (innerW * i) / (values.length - 1 || 1),
    padY + innerH - ((v - min) / range) * innerH,
  ]);
}

// ----- Sparkline (inline, tiny) -------------------------------------------
function Sparkline({ data, width = 80, height = 24, color = "var(--chart-1)", fill = false }) {
  const pts = _toPoints(data, width, height, 1, 2);
  const d = _smoothPath(pts);
  const gid = React.useId();
  return React.createElement("svg", { width, height, viewBox: `0 0 ${width} ${height}`, style: { display: "block" } },
    fill && React.createElement("defs", {},
      React.createElement("linearGradient", { id: `sf-${gid}`, x1: 0, y1: 0, x2: 0, y2: 1 },
        React.createElement("stop", { offset: "0%", stopColor: color, stopOpacity: 0.22 }),
        React.createElement("stop", { offset: "100%", stopColor: color, stopOpacity: 0 }),
      )
    ),
    fill && React.createElement("path", {
      d: d + ` L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`,
      fill: `url(#sf-${gid})`,
    }),
    React.createElement("path", { d, fill: "none", stroke: color, strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" }),
  );
}

// ----- LineChart (multi-series, no axes, optional last-point dot) ---------
// variant: smooth | linear | step | area | dots | compare
function LineChart({
  series,              // [{ label, data, color }]
  width = 600, height = 220,
  variant = "smooth",
  smooth,              // legacy — maps to smooth vs linear when variant omitted
  area = false,
  highlightLast = true,
  showGrid = false,
  labels,              // array of x labels matching data length
  showHover = true,
}) {
  const [hover, setHover] = React.useState(null);
  const chartId = React.useId().replace(/:/g, "");
  const padX = 12;
  const padY = 16;
  const svgRef = React.useRef(null);

  const resolvedVariant = variant || (smooth === false ? "linear" : "smooth");
  const useArea = area || resolvedVariant === "area";
  const useDots = resolvedVariant === "dots";
  const isCompare = resolvedVariant === "compare";

  const allValues = series.flatMap(s => s.data);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const n = series[0]?.data?.length || 0;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const xAt = i => padX + (innerW * i) / (n - 1 || 1);
  const yAt = v => padY + innerH - ((v - min) / range) * innerH;

  const seriesStyle = (si) => {
    if (isCompare) {
      return si === 0
        ? { pathVariant: "smooth", strokeWidth: 2, dashed: false, fillArea: true, showDots: false, highlight: true }
        : { pathVariant: "linear", strokeWidth: 1.25, dashed: true, fillArea: false, showDots: false, highlight: false };
    }
    if (resolvedVariant === "area") {
      return { pathVariant: "smooth", strokeWidth: 1.75, dashed: false, fillArea: true, showDots: false, highlight: true };
    }
    if (resolvedVariant === "step") {
      return { pathVariant: "step", strokeWidth: 1.75, dashed: false, fillArea: false, showDots: false, highlight: true };
    }
    if (resolvedVariant === "dots") {
      return { pathVariant: "smooth", strokeWidth: 1.5, dashed: false, fillArea: false, showDots: true, highlight: false };
    }
    if (resolvedVariant === "linear") {
      return { pathVariant: "linear", strokeWidth: 1.5, dashed: false, fillArea: false, showDots: false, highlight: true };
    }
    return { pathVariant: "smooth", strokeWidth: 1.5, dashed: false, fillArea: useArea, showDots: false, highlight: true };
  };

  const onMove = (e) => {
    if (!showHover || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.round(((x - padX) / innerW) * (n - 1));
    if (idx >= 0 && idx < n) setHover(idx);
  };

  const gridLines = showGrid && [0.25, 0.5, 0.75].map((t, gi) =>
    React.createElement("line", {
      key: `grid-${gi}`,
      x1: padX, x2: width - padX,
      y1: padY + innerH * (1 - t), y2: padY + innerH * (1 - t),
      stroke: "var(--chart-track)", strokeWidth: 1,
    })
  );

  return React.createElement("div", { style: { position: "relative", width, height } },
    React.createElement("svg", {
      ref: svgRef,
      width, height, viewBox: `0 0 ${width} ${height}`,
      style: { display: "block", overflow: "visible" },
      onMouseMove: onMove,
      onMouseLeave: () => setHover(null),
    },
      gridLines,
      React.createElement("line", {
        x1: padX, x2: width - padX, y1: height - padY, y2: height - padY,
        stroke: "var(--chart-track)", strokeWidth: 1,
      }),
      ...series.map((s, si) => {
        const pts = s.data.map((v, i) => [xAt(i), yAt(v)]);
        const style = seriesStyle(si);
        const d = _seriesPath(pts, style.pathVariant);
        const color = s.color || `var(--chart-${(si % 6) + 1})`;
        const gid = `g-${chartId}-${si}`;
        return React.createElement(React.Fragment, { key: si },
          style.fillArea && React.createElement("defs", {},
            React.createElement("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 },
              React.createElement("stop", { offset: "0%", stopColor: color, stopOpacity: si === 0 ? 0.14 : 0.06 }),
              React.createElement("stop", { offset: "100%", stopColor: color, stopOpacity: 0 }),
            )
          ),
          style.fillArea && React.createElement("path", {
            d: d + ` L${pts[pts.length - 1][0]},${height - padY} L${pts[0][0]},${height - padY} Z`,
            fill: `url(#${gid})`,
          }),
          React.createElement("path", {
            d, fill: "none", stroke: color,
            strokeWidth: style.strokeWidth,
            strokeLinecap: style.pathVariant === "step" ? "square" : "round",
            strokeLinejoin: style.pathVariant === "step" ? "miter" : "round",
            strokeDasharray: style.dashed ? "5 4" : undefined,
          }),
          style.showDots && pts.map((p, pi) =>
            React.createElement("circle", {
              key: pi, cx: p[0], cy: p[1], r: pi === pts.length - 1 ? 3.5 : 2.5,
              fill: pi === pts.length - 1 ? color : "var(--surface)",
              stroke: color, strokeWidth: 1.25,
            })
          ),
          highlightLast && style.highlight && !style.showDots && React.createElement("circle", {
            cx: pts[pts.length - 1][0], cy: pts[pts.length - 1][1], r: 3.5,
            fill: "var(--surface)", stroke: color, strokeWidth: 2,
          }),
        );
      }),
      // hover marker
      hover != null && React.createElement("g", {},
        React.createElement("line", {
          x1: xAt(hover), x2: xAt(hover), y1: padY, y2: height - padY,
          stroke: "var(--chart-3)", strokeWidth: 1, strokeDasharray: "2 3",
        }),
        ...series.map((s, si) => {
          const color = s.color || `var(--chart-${(si % 6) + 1})`;
          return React.createElement("circle", {
            key: si, cx: xAt(hover), cy: yAt(s.data[hover]), r: 3,
            fill: "var(--surface)", stroke: color, strokeWidth: 1.5,
          });
        }),
      ),
    ),
    // hover tooltip
    hover != null && React.createElement("div", {
      style: {
        position: "absolute",
        left: Math.min(width - 120, Math.max(0, xAt(hover) - 60)),
        top: 0,
        background: "var(--neutral-900)", color: "var(--fg-inverse)",
        padding: "6px 8px", borderRadius: "var(--radius-xs)",
        fontSize: 11, fontFamily: "var(--font-sans)",
        boxShadow: "var(--shadow-md)", pointerEvents: "none",
        minWidth: 100,
      }
    },
      labels && React.createElement("div", { style: { fontSize: 10, color: "var(--neutral-400)", marginBottom: 2 } }, labels[hover]),
      ...series.map((s, si) =>
        React.createElement("div", { key: si, style: { display: "flex", justifyContent: "space-between", gap: 8, fontVariantNumeric: "tabular-nums" } },
          React.createElement("span", { style: { color: "var(--neutral-300)" } }, s.label),
          React.createElement("span", { style: { fontWeight: 500 } }, s.format ? s.format(s.data[hover]) : s.data[hover]),
        )
      ),
    ),
    // x labels (thin, light)
    labels && React.createElement("div", {
      style: {
        position: "absolute", left: padX, right: padX, bottom: -2,
        display: "flex", justifyContent: "space-between",
        fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.02em",
        fontVariantNumeric: "tabular-nums",
        pointerEvents: "none",
      }
    }, labels.map((l, i) =>
      React.createElement("span", { key: i, style: { transform: i === 0 ? "translateX(0)" : i === labels.length - 1 ? "translateX(0)" : "translateX(-50%)" } },
        (i % Math.max(1, Math.ceil(labels.length / 7)) === 0 || i === labels.length - 1) ? l : ""
      )
    )),
  );
}

// ----- BarChart -----------------------------------------------------------
function BarChart({
  data,                 // [{ label, value }] or just numbers
  width = 600, height = 180,
  color = "var(--chart-1)",
  highlightIndex,
  showLabels = true,
  barRadius = 2,
}) {
  const items = data.map(d => typeof d === "number" ? { value: d } : d);
  const max = Math.max(...items.map(d => d.value));
  const padX = 8;
  const padY = showLabels ? 22 : 8;
  const innerW = width - padX * 2;
  const innerH = height - padY;
  const gap = 6;
  const barW = Math.max(2, (innerW - gap * (items.length - 1)) / items.length);

  return React.createElement("svg", {
    width, height, viewBox: `0 0 ${width} ${height}`, style: { display: "block", overflow: "visible" }
  },
    items.map((d, i) => {
      const h = (d.value / max) * innerH;
      const x = padX + i * (barW + gap);
      const y = innerH - h;
      const isHi = highlightIndex === i;
      return React.createElement("g", { key: i },
        React.createElement("rect", {
          x, y, width: barW, height: h,
          rx: barRadius,
          fill: isHi ? color : "var(--chart-bar)",
          style: { transition: "fill var(--dur) var(--ease-out)" },
        }),
        showLabels && d.label && React.createElement("text", {
          x: x + barW / 2, y: height - 6,
          textAnchor: "middle",
          style: { fontSize: 10, fill: isHi ? "var(--fg)" : "var(--fg-faint)", fontFamily: "var(--font-sans)", fontVariantNumeric: "tabular-nums" }
        }, d.label),
      );
    }),
  );
}

// ----- Donut (compact, single value) --------------------------------------
function Donut({ value, total = 100, size = 56, color = "var(--chart-1)", track = "var(--chart-track)", thickness = 5 }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / total));
  return React.createElement("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, style: { display: "block" } },
    React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: track, strokeWidth: thickness }),
    React.createElement("circle", {
      cx: size / 2, cy: size / 2, r, fill: "none",
      stroke: color, strokeWidth: thickness,
      strokeLinecap: "round",
      strokeDasharray: `${c * pct} ${c}`,
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
    }),
  );
}

Object.assign(window, { LineChart, BarChart, Sparkline, Donut });
