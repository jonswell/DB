/* global React */
// Forma — Inline Lucide icon registry.
// Paths lifted from Lucide v0.460 (ISC). Rendered as SVG so we don't need
// the lucide-react bundle (which ships its own React copy and conflicts
// with our global React).

const I = {
  // Layout / nav
  "layout-dashboard": [
    ["rect", { width: 7, height: 9, x: 3, y: 3, rx: 1 }],
    ["rect", { width: 7, height: 5, x: 14, y: 3, rx: 1 }],
    ["rect", { width: 7, height: 9, x: 14, y: 12, rx: 1 }],
    ["rect", { width: 7, height: 5, x: 3, y: 16, rx: 1 }],
  ],
  "bar-chart-3": [
    ["path", { d: "M3 3v18h18" }],
    ["path", { d: "M7 16V8" }],
    ["path", { d: "M12 16V4" }],
    ["path", { d: "M17 16v-6" }],
  ],
  "file-text": [
    ["path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }],
    ["polyline", { points: "14 2 14 8 20 8" }],
    ["line", { x1: 16, x2: 8, y1: 13, y2: 13 }],
    ["line", { x1: 16, x2: 8, y1: 17, y2: 17 }],
    ["line", { x1: 10, x2: 8, y1: 9, y2: 9 }],
  ],
  "users": [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: 9, cy: 7, r: 4 }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }],
  ],
  "user": [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: 12, cy: 7, r: 4 }],
  ],
  "folder": [
    ["path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }],
  ],
  "wallet": [
    ["path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" }],
    ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }],
  ],
  "settings": [
    ["path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }],
    ["circle", { cx: 12, cy: 12, r: 3 }],
  ],
  "life-buoy": [
    ["circle", { cx: 12, cy: 12, r: 10 }],
    ["path", { d: "m4.93 4.93 4.24 4.24" }],
    ["path", { d: "m14.83 9.17 4.24-4.24" }],
    ["path", { d: "m14.83 14.83 4.24 4.24" }],
    ["path", { d: "m9.17 14.83-4.24 4.24" }],
    ["circle", { cx: 12, cy: 12, r: 4 }],
  ],
  // Chevrons
  "chevrons-left": [
    ["path", { d: "m11 17-5-5 5-5" }],
    ["path", { d: "m18 17-5-5 5-5" }],
  ],
  "chevrons-right": [
    ["path", { d: "m6 17 5-5-5-5" }],
    ["path", { d: "m13 17 5-5-5-5" }],
  ],
  "chevrons-up-down": [
    ["path", { d: "m7 15 5 5 5-5" }],
    ["path", { d: "m7 9 5-5 5 5" }],
  ],
  "chevron-left":  [["path", { d: "m15 18-6-6 6-6" }]],
  "chevron-right": [["path", { d: "m9 18 6-6-6-6" }]],
  "chevron-down":  [["path", { d: "m6 9 6 6 6-6" }]],
  // Topbar
  "search": [
    ["circle", { cx: 11, cy: 11, r: 8 }],
    ["path", { d: "m21 21-4.3-4.3" }],
  ],
  "command": [
    ["path", { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" }],
  ],
  "bell": [
    ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }],
    ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
  ],
  "help-circle": [
    ["circle", { cx: 12, cy: 12, r: 10 }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
    ["path", { d: "M12 17h.01" }],
  ],
  "log-out": [
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }],
    ["polyline", { points: "16 17 21 12 16 7" }],
    ["line", { x1: 21, x2: 9, y1: 12, y2: 12 }],
  ],
  // Actions
  "download": [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["polyline", { points: "7 10 12 15 17 10" }],
    ["line", { x1: 12, x2: 12, y1: 15, y2: 3 }],
  ],
  "plus": [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "M12 5v14" }],
  ],
  "calendar": [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: 18, height: 18, x: 3, y: 4, rx: 2 }],
    ["path", { d: "M3 10h18" }],
  ],
  "filter": [
    ["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }],
  ],
  "more-horizontal": [
    ["circle", { cx: 12, cy: 12, r: 1 }],
    ["circle", { cx: 19, cy: 12, r: 1 }],
    ["circle", { cx: 5,  cy: 12, r: 1 }],
  ],
  "play": [
    ["polygon", { points: "6 3 20 12 6 21 6 3" }],
  ],
  // Arrows
  "arrow-up-right":   [["path", { d: "M7 7h10v10" }], ["path", { d: "M7 17 17 7" }]],
  "arrow-down-right": [["path", { d: "M7 17h10V7" }], ["path", { d: "M7 7l10 10" }]],
  "arrow-right":      [["path", { d: "M5 12h14" }], ["path", { d: "m12 5 7 7-7 7" }]],
  "arrow-left":       [["path", { d: "M19 12H5" }], ["path", { d: "m12 19-7-7 7-7" }]],
  // Empty-state icons
  "inbox": [
    ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }],
    ["path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" }],
  ],
  "zap": [
    ["polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }],
  ],
  "puzzle": [
    ["path", { d: "M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z" }],
  ],
};

const _cache = window.__formaIconCache || (window.__formaIconCache = {});

function Icon({ name, size = 16, stroke = 1.5, color = "currentColor", style, ...rest }) {
  const paths = I[name];
  if (!paths) {
    return React.createElement("span", {
      style: { display: "inline-block", width: size, height: size, ...style }, ...rest
    });
  }
  return React.createElement("svg", {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color,
    strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "block", flexShrink: 0, ...style }, ...rest,
  }, paths.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs })));
}

window.Icon = Icon;
