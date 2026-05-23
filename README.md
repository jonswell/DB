# Forma Design System

A minimal, modern, light dashboard system for building versatile homepage and dashboard interfaces. Forma is intentionally restrained: lots of whitespace, monochrome accent, sophisticated-but-quiet charts, and icons reserved strictly for wayfinding.

## Index

```
README.md                — this file
SKILL.md                 — agent skill manifest
colors_and_type.css      — foundations (CSS variables for color, type, space, radius, shadow, motion)
preview/                 — small specimens shown in the Design System tab
ui_kits/dashboard/       — JSX components + interactive index.html demo
assets/                  — logo mark, placeholder, etc
```

## Sources & inspiration

The user provided three reference screenshots (`uploads/`) showing the *aesthetic target*: minimal, light, breathable, sophisticated charts, restrained iconography. Forma is an **original** system inspired by that aesthetic — it does not replicate any of the branded products in those screenshots.

## Content fundamentals

- **Voice:** neutral, declarative, technical. No exclamation marks, no marketing puffery.
- **Casing:** Sentence case everywhere (`Total revenue`, not `Total Revenue`). Uppercase reserved for eyebrows + table headers (with 0.08em tracking).
- **Tone:** the dashboard speaks *about* data, not *to* the user. Prefer "12 active sessions" over "You have 12 active sessions".
- **Numbers:** always tabular-numerals. Currency uses `$1,284.00` (USD default). Percentages get the `+` sign for positive deltas; minus sign is automatic for negatives.
- **Time:** relative for recent (`2m ago`, `Yesterday`), absolute date for older (`May 14, 2026`).
- **No emoji.** No exclamation marks in product UI.
- **Labels:** short. `Revenue`, not `Total revenue this period`. Detail lives in tooltips and subtitles.

## Visual foundations

### Color
- **Neutral-first.** A single warm-cool grey scale (`--neutral-0` → `--neutral-950`) drives almost everything. Saturation is intentionally near zero.
- **Mono accent.** `--accent` is `#1f1f1f`. Used only on primary buttons, the active nav state, and the *single most important* number in a chart series. Never used as a background fill.
- **Chart series** are 4 desaturated greys + 2 very subtle hue-tinted tones (`oklch(0.55 0.04 …)`) for differentiation when more than two series are present.
- **Semantic state** colors (positive/negative/warning/info) are muted oklch tones with paired ultra-light tinted backgrounds for badges.

### Type
- **Inter** (300–700) for everything. **JetBrains Mono** for code samples and the occasional metric label.
- Compact scale starting at 13.5px body. KPIs render at 30px / weight 500 with `tracking-tighter`.
- Eyebrow labels use `--text-xs` uppercase with 0.08em tracking; weight 500; muted color.

### Spacing & layout
- 4px base unit. The compact density preset uses `space-4` (8px) and `space-6` (12px) as the most common gaps.
- Cards are flush against a 24px page gutter. Grid gaps default to 12–16px.
- Section headers use a 24px top-margin / 8px bottom-margin rhythm.

### Radii
- Soft: `--radius` 8px (cards, buttons), `--radius-lg` 12px (modals, large cards). `--radius-full` for chips & avatars only. Inputs use 6px to feel slightly tighter than cards.

### Elevation
- Shadows are *whisper-thin*. Cards default to `--shadow-sm` (1px border + 1–2px ambient blur). Popovers use `--shadow-md`. Heavy `--shadow-pop` is reserved for modals.
- Most surfaces sit on the white canvas with a **1px border** rather than a shadow — the border is the primary delineator in this system.

### Borders & dividers
- `--border` (1px, `#e7e5e4`) is the workhorse. `--divider` (1px `#eeeeec`) for in-card row separators.

### Motion
- Quick. `--dur` 180ms with `--ease-out`. No bounces, no springs. Hover transitions are typically opacity or background changes, never scale.
- Hover states: surfaces darken by ~one neutral step (`--surface` → `--neutral-50`). Buttons lighten/darken accent by one step.
- Press states: background only — no shrink, no shadow change.

### Backgrounds & imagery
- No gradients in chrome. No textures. No background imagery in cards.
- Where imagery is needed (e.g. a welcome-video card), we use a flat neutral placeholder with a monospace label rather than a stock photo. Real product imagery is dropped in via `image-slot`.

### Transparency & blur
- Used only for modal scrims (50% black) and the search dropdown shadow. No frosted glass.

### Cards
- `background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: var(--space-7);` is the canonical card. Optional `--shadow-xs` for an extra-quiet lift.

## Iconography

- **Lucide** via the [official ESM CDN](https://lucide.dev/). Stroke width is locked to **1.5px**. Default size is **16px** at body, **18px** in the topbar, **20px** in stat cards.
- Icons are used **only for wayfinding** — sidebar nav, breadcrumbs, primary actions on cards. Never as decorative ornaments and never alongside text labels in body content.
- No emoji. No unicode-glyph icons. No custom hand-drawn SVG icons.

## Components included

App shell (sidebar + topbar), KPI / stat cards, line + area charts, bar charts, data tables (sortable), activity / timeline feed, buttons + form inputs, badges + tags, segmented controls, avatars, empty states, and a welcome-video card.

## Caveats

- Inter and JetBrains Mono are loaded from Google Fonts — no local `fonts/` folder. Swap in licensed copies for production.
- Charts are rendered with hand-drawn SVG paths (no chart library) so the aesthetic stays unified; the data is illustrative.
