---
name: forma-design
description: Use this skill to generate well-branded dashboard interfaces and assets in the Forma style — minimal, modern, light, with sophisticated but restrained charts and iconography reserved for wayfinding. Suitable for production prototypes, mocks, and throwaway design artifacts.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files (`colors_and_type.css`, `ui_kits/dashboard/`, `preview/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Import `colors_and_type.css` and reuse the JSX components in `ui_kits/dashboard/` as the starting point for any dashboard layout.

Core rules:
- **Mono accent only.** `--accent` is near-black. Color is for state, not decoration.
- **Icons for wayfinding only** (Lucide, 1.5px stroke). No decorative icons, no emoji.
- **Charts are thin, axis-less, gridless.** Series colors come from `--chart-1…6`.
- **Borders, not shadows** are the primary delineator. Cards default to a 1px border + optional whisper shadow.
- **Sentence case, no exclamation marks**, tabular numerals.

If the user invokes this skill without any other guidance, ask what they want to build, then act as a senior product designer producing HTML artifacts or production-ready React code with the Forma foundations.
