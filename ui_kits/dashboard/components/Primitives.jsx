/* global React */
// Forma — Primitives: Button, IconButton, Badge, Tag, Input, Card, SegmentedControl, Avatar, Tooltip
// (Icon component lives in Icons.jsx — loaded BEFORE this file in index.html)
const { useState } = React;

// ----- Button -------------------------------------------------------------
function Button({
  variant = "primary",      // primary | secondary | ghost | danger
  size = "md",               // sm | md | lg
  shape,                     // undefined | "pill"
  iconLeft, iconRight,
  children, style, ...rest
}) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: "var(--space-4)",
    fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "-0.005em",
    border: "0.5px solid transparent", cursor: "pointer",
    transition: "background var(--dur) var(--ease-out), color var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)",
    whiteSpace: "nowrap", userSelect: "none",
  };
  const sizes = {
    sm: { fontSize: "var(--text-sm)",  padding: "5px 10px",  height: 26, borderRadius: "var(--radius-sm)" },
    md: { fontSize: "var(--text-base)",padding: "7px 12px",  height: 32, borderRadius: "var(--radius-sm)" },
    lg: { fontSize: "var(--text-md)",  padding: "10px 16px", height: 38, borderRadius: "var(--radius)" },
  };
  const variants = {
    primary:   { background: "var(--accent)",     color: "var(--accent-fg)" },
    secondary: { background: "var(--surface)",    color: "var(--fg)", borderColor: "var(--border-strong)" },
    ghost:     { background: "transparent",       color: "var(--fg-muted)" },
    danger:    { background: "transparent",       color: "var(--negative)", borderColor: "var(--negative)" },
  };
  // Pill shape — full-radius + slightly more horizontal padding
  const pillPad = { sm: "5px 14px", md: "7px 16px", lg: "10px 20px" };
  const shapeStyle = shape === "pill" ? { borderRadius: "var(--radius-pill)", padding: pillPad[size] } : null;
  return React.createElement("button", {
    style: { ...base, ...sizes[size], ...variants[variant], ...shapeStyle, ...style },
    ...rest
  },
    iconLeft && React.createElement(Icon, { name: iconLeft, size: size === "sm" ? 12 : 14 }),
    children,
    iconRight && React.createElement(Icon, { name: iconRight, size: size === "sm" ? 12 : 14 })
  );
}

// ----- IconButton ---------------------------------------------------------
function IconButton({ icon, size = 32, label, active, style, ...rest }) {
  return React.createElement("button", {
    "aria-label": label, title: label,
    style: {
      width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: active ? "var(--neutral-100)" : "transparent",
      color: active ? "var(--fg)" : "var(--fg-muted)",
      border: "0.5px solid transparent",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      transition: "background var(--dur) var(--ease-out), color var(--dur) var(--ease-out)",
      ...style,
    }, ...rest
  }, React.createElement(Icon, { name: icon, size: size <= 28 ? 14 : 16 }));
}

// ----- Badge --------------------------------------------------------------
function Badge({ tone = "neutral", children, style, dot, ...rest }) {
  const tones = {
    neutral:  { bg: "var(--neutral-100)",  fg: "var(--fg-muted)",  border: "var(--border)" },
    positive: { bg: "var(--positive-bg)", fg: "var(--positive)",   border: "transparent" },
    negative: { bg: "var(--negative-bg)", fg: "var(--negative)",   border: "transparent" },
    warning:  { bg: "var(--warning-bg)",  fg: "var(--warning)",    border: "transparent" },
    info:     { bg: "var(--info-bg)",     fg: "var(--info)",       border: "transparent" },
    solid:    { bg: "var(--accent)",      fg: "var(--accent-fg)",  border: "transparent" },
  };
  const t = tones[tone] || tones.neutral;
  return React.createElement("span", {
    style: {
      display: "inline-flex", alignItems: "center", gap: 6,
      background: t.bg, color: t.fg, border: `0.5px solid ${t.border}`,
      fontSize: "var(--text-xs)", fontWeight: 500, letterSpacing: "-0.005em",
      padding: "2px 8px", borderRadius: "var(--radius-full)",
      lineHeight: 1.4, whiteSpace: "nowrap",
      ...style
    }, ...rest
  },
    dot && React.createElement("span", { style: { width: 5, height: 5, borderRadius: 999, background: "currentColor" } }),
    children
  );
}

// ----- Input --------------------------------------------------------------
function Input({ iconLeft, iconRight, style, wrapStyle, ...rest }) {
  return React.createElement("div", {
    style: {
      display: "flex", alignItems: "center", gap: 8,
      background: "var(--surface)", border: "0.5px solid var(--border)",
      borderRadius: "var(--radius-sm)", padding: "0 10px",
      transition: "border-color var(--dur) var(--ease-out)",
      ...wrapStyle,
    }
  },
    iconLeft && React.createElement(Icon, { name: iconLeft, size: 14, color: "var(--fg-faint)" }),
    React.createElement("input", {
      style: {
        background: "transparent", border: 0, outline: 0,
        fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--fg)",
        height: 30, flex: 1, padding: 0,
        ...style
      }, ...rest
    }),
    iconRight && React.createElement(Icon, { name: iconRight, size: 14, color: "var(--fg-faint)" })
  );
}

// ----- Card ---------------------------------------------------------------
function Card({ children, padding = 16, radius, elevation, style, hover, className, ...rest }) {
  return React.createElement("div", {
    className: ["card-surface", className].filter(Boolean).join(" ") || undefined,
    style: {
      background: "var(--surface)",
      border: "0.5px solid var(--border)",
      borderRadius: radius || "var(--radius-card)",
      padding,
      boxShadow: elevation === "none" ? "none" : (elevation || "var(--shadow-card)"),
      transition: "border-color var(--dur) var(--ease-out)",
      ...(hover ? { cursor: "pointer" } : {}),
      ...style
    }, ...rest
  }, children);
}

function CardHeader({ title, subtitle, action, eyebrow, style }) {
  return React.createElement("div", {
    style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14, ...style }
  },
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 } },
      eyebrow && React.createElement("div", { className: "eyebrow" }, eyebrow),
      title && React.createElement("div", { className: "card-title" }, title),
      subtitle && React.createElement("div", { className: "card-subtitle" }, subtitle),
    ),
    action
  );
}

// ----- Segmented control --------------------------------------------------
function SegmentedControl({ options, value, onChange, size = "sm" }) {
  const h = size === "sm" ? 26 : 30;
  return React.createElement("div", {
    style: {
      display: "inline-flex", padding: 2, background: "var(--neutral-100)",
      borderRadius: "var(--radius-sm)", gap: 2, height: h,
    }
  }, options.map(opt =>
    React.createElement("button", {
      key: opt.value || opt,
      onClick: () => onChange && onChange(opt.value || opt),
      style: {
        background: (value === (opt.value || opt)) ? "var(--surface)" : "transparent",
        color: (value === (opt.value || opt)) ? "var(--fg)" : "var(--fg-subtle)",
        border: 0, borderRadius: "var(--radius-xs)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: 500,
        padding: "0 10px", height: h - 4, cursor: "pointer",
        boxShadow: (value === (opt.value || opt)) ? "var(--shadow-xs)" : "none",
        transition: "all var(--dur) var(--ease-out)",
      }
    }, opt.label || opt)
  ));
}

// ----- Avatar -------------------------------------------------------------
function Avatar({ name = "?", size = 24, src, style }) {
  const initials = name.split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return React.createElement("div", {
    style: {
      width: size, height: size, borderRadius: 999,
      background: src ? "transparent" : `oklch(0.88 0.02 ${hue})`,
      color: `oklch(0.32 0.04 ${hue})`,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: Math.max(9, size * 0.4), fontWeight: 600,
      letterSpacing: "-0.02em",
      flexShrink: 0, overflow: "hidden",
      ...style
    }
  }, src ? React.createElement("img", { src, alt: name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : initials);
}

// ----- Divider ------------------------------------------------------------
function Divider({ vertical, style }) {
  return React.createElement("div", {
    style: {
      background: "var(--divider)",
      ...(vertical
        ? { width: 1, height: "100%", alignSelf: "stretch" }
        : { height: 1, width: "100%" }),
      ...style
    }
  });
}

// expose
Object.assign(window, { Button, IconButton, Badge, Input, Card, CardHeader, SegmentedControl, Avatar, Divider });
