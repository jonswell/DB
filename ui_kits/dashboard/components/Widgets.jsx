/* global React, Card, CardHeader, Icon, IconButton, Badge, LineChart, BarChart, Donut, Avatar, Button */
// Forma — Widgets: KPI, Table, ActivityFeed, EmptyState, WelcomeVideo

// ----- KPI / Stat ---------------------------------------------------------
function StatCard({ label, value, delta, deltaLabel, format, style }) {
  const positive = delta != null && delta >= 0;
  return React.createElement(Card, { padding: 14, style: { display: "flex", flexDirection: "column", gap: 10, ...style } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      React.createElement("div", { className: "eyebrow" }, label),
      React.createElement(IconButton, { icon: "more-horizontal", label: "More", size: 22 }),
    ),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 } },
      React.createElement("div", { className: "kpi" }, format ? format(value) : value),
      (delta != null || deltaLabel) && React.createElement("div", {
        className: "card-meta",
        style: { display: "flex", alignItems: "center", gap: 6, color: "var(--fg-subtle)" }
      },
        delta != null && React.createElement("span", {
          style: {
            display: "inline-flex", alignItems: "center", gap: 2,
            color: positive ? "var(--positive)" : "var(--negative)",
            fontVariantNumeric: "tabular-nums", fontWeight: 500,
          }
        },
          React.createElement(Icon, { name: positive ? "arrow-up-right" : "arrow-down-right", size: 11 }),
          `${positive ? "+" : ""}${delta.toFixed(2)}%`,
        ),
        deltaLabel && React.createElement("span", {}, deltaLabel),
      ),
    ),
  );
}

// ----- DataTable ----------------------------------------------------------
function DataTable({ columns, rows, density = "compact" }) {
  const padY = density === "compact" ? 8 : 12;
  return React.createElement("div", { style: { width: "100%", overflow: "auto" } },
    React.createElement("table", {
      style: { width: "100%", borderCollapse: "separate", borderSpacing: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-base)" }
    },
      React.createElement("thead", {},
        React.createElement("tr", {},
          columns.map((c, i) => React.createElement("th", {
            key: i,
            style: {
              textAlign: c.align || "left",
              fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--fg-subtle)",
              textTransform: "uppercase", letterSpacing: "0.08em",
              padding: `${padY}px 12px`,
              borderBottom: "0.5px solid var(--border)",
              whiteSpace: "nowrap",
              width: c.width,
            }
          },
            React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 4, cursor: c.sortable ? "pointer" : "default" } },
              c.label,
              c.sortable && React.createElement(Icon, { name: "chevrons-up-down", size: 10, color: "var(--fg-faint)" }),
            )
          ))
        )
      ),
      React.createElement("tbody", {},
        rows.map((row, ri) => React.createElement("tr", {
          key: ri,
          style: { transition: "background var(--dur) var(--ease-out)" },
          onMouseEnter: e => e.currentTarget.style.background = "var(--neutral-50)",
          onMouseLeave: e => e.currentTarget.style.background = "transparent",
        },
          columns.map((c, ci) => React.createElement("td", {
            key: ci,
            style: {
              padding: `${padY}px 12px`,
              borderBottom: "0.5px solid var(--divider)",
              textAlign: c.align || "left",
              color: c.muted ? "var(--fg-muted)" : "var(--fg)",
              fontVariantNumeric: c.tabular !== false ? "tabular-nums" : "normal",
              verticalAlign: "middle",
              whiteSpace: c.wrap ? "normal" : "nowrap",
            }
          }, c.render ? c.render(row[c.key], row, ri) : row[c.key]))
        ))
      )
    )
  );
}

// ----- Activity / timeline feed -------------------------------------------
function ActivityFeed({ items }) {
  return React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
    items.map((it, i) => React.createElement("div", {
      key: i,
      style: {
        display: "grid", gridTemplateColumns: "16px 1fr auto",
        gap: 10, alignItems: "flex-start",
        padding: "8px 0",
        position: "relative",
      }
    },
      // dot + connector line
      React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", height: "100%", paddingTop: 5 } },
        React.createElement("div", {
          style: {
            width: 6, height: 6, borderRadius: 999,
            background: it.tone === "positive" ? "var(--positive)"
                       : it.tone === "negative" ? "var(--negative)"
                       : "var(--neutral-300)",
            flexShrink: 0,
          }
        }),
        i < items.length - 1 && React.createElement("div", { style: { width: 1, flex: 1, background: "var(--divider)", marginTop: 4 } }),
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 } },
        React.createElement("div", { className: "card-feed-line" },
          it.actor && React.createElement("span", { className: "card-strong" }, it.actor + " "),
          React.createElement("span", {}, it.action + " "),
          it.target && React.createElement("span", { className: "card-strong" }, it.target),
        ),
        it.meta && React.createElement("div", { className: "card-meta" }, it.meta),
      ),
      React.createElement("div", { className: "card-meta", style: { whiteSpace: "nowrap", paddingTop: 4 } }, it.time),
    ))
  );
}

// ----- Empty state --------------------------------------------------------
function EmptyState({ icon = "inbox", title, description, action, compact }) {
  return React.createElement("div", {
    style: {
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: compact ? "24px 16px" : "48px 24px",
      gap: 10,
    }
  },
    React.createElement("div", {
      style: {
        width: 40, height: 40, borderRadius: "var(--radius-sm)",
        background: "var(--neutral-100)", color: "var(--fg-muted)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }
    }, React.createElement(Icon, { name: icon, size: 18 })),
    React.createElement("div", { className: "card-title", style: { marginTop: 4 } }, title),
    description && React.createElement("div", { className: "card-subtitle", style: { maxWidth: 280 } }, description),
    action && React.createElement("div", { style: { marginTop: 6 } }, action),
  );
}

// ----- WelcomeVideoCard --------------------------------------------------
function WelcomeVideoCard({
  title = "Get started with Forma",
  subtitle = "A 3-minute walkthrough of the dashboard.",
  duration = "3:12",
  src,
  poster,
  badge = "Quick tour",
  eyebrow = "Welcome",
  fit = "contain",
  className,
  chapters = [
    { time: "0:00", label: "Tour the overview" },
    { time: "0:48", label: "Build your first widget" },
    { time: "1:32", label: "Connect a data source" },
    { time: "2:14", label: "Share with your team" },
  ],
  style,
}) {
  const [videoDuration, setVideoDuration] = React.useState(null);

  const formatDuration = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return null;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const durationLabel = videoDuration ? formatDuration(videoDuration) : duration;
  const showFooter = eyebrow || title || subtitle || (chapters && chapters.length > 0);

  return React.createElement(Card, {
    padding: 0,
    className,
    style: {
      display: "flex", flexDirection: "column", overflow: "hidden",
      ...style
    }
  },
    React.createElement("div", {
      className: src ? "plan90-welcome-video__media" : undefined,
      style: {
        position: "relative",
        width: "100%", flex: "1 1 auto", minHeight: src ? 0 : 160,
        background: src ? "var(--neutral-100)" : undefined,
        backgroundImage: src
          ? undefined
          : "repeating-linear-gradient(135deg, var(--neutral-150) 0 8px, var(--neutral-100) 8px 16px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: src ? "hidden" : undefined,
      }
    },
      src
        ? React.createElement("video", {
            src,
            poster,
            controls: true,
            playsInline: true,
            preload: "metadata",
            style: {
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: fit,
              objectPosition: "center center",
              background: "var(--neutral-100)",
            },
            onLoadedMetadata: (e) => setVideoDuration(e.currentTarget.duration),
          })
        : React.createElement("button", {
            "aria-label": "Play",
            style: {
              width: 56, height: 56, borderRadius: 999,
              background: "var(--accent)", color: "var(--accent-fg)",
              border: 0, cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: "var(--shadow-md)",
              transition: "transform var(--dur) var(--ease-out)",
            },
            onMouseEnter: e => e.currentTarget.style.transform = "scale(1.04)",
            onMouseLeave: e => e.currentTarget.style.transform = "scale(1)",
          }, React.createElement(Icon, { name: "play", size: 22, style: { marginLeft: 3 } })),
      badge && React.createElement("div", {
        style: {
          position: "absolute", top: 12, left: 12,
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "var(--surface)", color: "var(--fg-muted)",
          border: "0.5px solid var(--border)",
          fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 999,
          letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap",
          pointerEvents: "none",
        }
      }, badge),
      !src && durationLabel && React.createElement("div", {
        style: {
          position: "absolute", bottom: 10, right: 10,
          background: "rgba(17, 17, 16, 0.75)", color: "var(--fg-inverse)",
          fontSize: 10, fontVariantNumeric: "tabular-nums",
          padding: "3px 7px", borderRadius: 4,
          fontFamily: "var(--font-mono)",
        }
      }, durationLabel),
    ),

    showFooter && React.createElement("div", {
      className: src ? "plan90-welcome-video__footer" : undefined,
      style: { padding: 16, display: "flex", flexDirection: "column", gap: 6, flexShrink: 0, borderTop: "0.5px solid var(--border)" }
    },
      eyebrow && React.createElement("div", { className: "eyebrow" }, eyebrow),
      title && React.createElement("div", { className: "card-hero-title" }, title),
      subtitle && React.createElement("div", { className: "card-subtitle", style: { maxWidth: 540 } }, subtitle),

      chapters && chapters.length > 0 && React.createElement("div", {
        style: {
          marginTop: 10, paddingTop: 10, borderTop: "0.5px solid var(--divider)",
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0,
        }
      }, chapters.map((c, i) => React.createElement("button", {
        key: i,
        style: {
          background: "transparent", border: 0, cursor: "pointer",
          padding: "8px 10px 8px 0",
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "var(--font-sans)", textAlign: "left",
          color: "var(--fg)", fontSize: "var(--text-sm)",
          borderRadius: "var(--radius-xs)",
          transition: "background var(--dur) var(--ease-out)",
        },
        onMouseEnter: e => e.currentTarget.style.background = "var(--neutral-50)",
        onMouseLeave: e => e.currentTarget.style.background = "transparent",
      },
        React.createElement("span", {
          className: "card-meta",
          style: {
            background: "var(--neutral-100)", padding: "2px 6px", borderRadius: 4,
            flexShrink: 0,
          }
        }, c.time),
        React.createElement("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, c.label),
        React.createElement(Icon, { name: "arrow-right", size: 12, color: "var(--fg-faint)" }),
      ))),
    ),
  );
}

Object.assign(window, { StatCard, DataTable, ActivityFeed, EmptyState, WelcomeVideoCard });
