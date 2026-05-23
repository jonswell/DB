# Dashboard UI kit

Interactive overview dashboard built from Forma primitives. Open `index.html` to interact.

## Files

```
index.html              — entry point; loads all scripts and mounts <App/>
components/Primitives.jsx  — Button, IconButton, Badge, Input, Card,
                              CardHeader, SegmentedControl, Avatar, Divider, Icon
components/Shell.jsx       — Sidebar, Topbar, NavItem, PageHeader
components/Charts.jsx      — LineChart, BarChart, Sparkline, Donut
components/Widgets.jsx     — StatCard, DataTable, ActivityFeed,
                              EmptyState, WelcomeVideoCard
pages/Overview.jsx         — composed demo page
```

## Composition rules

- Page = `Sidebar` + (`Topbar` + scrollable `<main>` containing a `PageHeader` and a grid of `Card`s).
- Cards have 16px outer gap, 14–18px inner padding. KPI rows use a 4-column grid; main content typically uses 2-column ratios of 2.1:1 or 1.4:1.
- Charts are always wrapped in `ResponsiveChartWrap` so they refit on resize.

## Adding a new page

1. Copy `pages/Overview.jsx` to e.g. `pages/Audience.jsx`, define an exported component, add it to `Object.assign(window, ...)`.
2. Add `<script type="text/babel" src="./pages/Audience.jsx"></script>` to `index.html`.
3. Branch on `nav` state in the root `App` to render the right page component.
