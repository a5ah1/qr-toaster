# CLAUDE.md

Agent-eye view of QR Toaster. Public project info lives in `README.md`; this file is for hard constraints and non-obvious conventions you'd otherwise have to re-derive each session.

## What this is

A privacy-focused, fully client-side QR code generator. Eleventy + vanilla JS, deployed to GitHub Pages at https://a5ah1.github.io/qr-toaster/.

## Hard constraints

Product-defining, not stylistic. Don't violate without explicit user direction.

- **No third-party network calls after initial page load.** No CDNs, no web fonts (`fonts.googleapis.com` is banned), no analytics, no trackers, no remote scripts. The "no analytics, no servers" claim on the site has to be literally true — verify in DevTools Network tab on a fresh load.
- **No Tailwind or utility-CSS framework.** Removed in 2026-05 (see `CHANGELOG.md`). Don't reintroduce.
- **No server-side processing.** Every feature runs entirely in the browser.

## Stack

- **Eleventy 3** with Liquid templates and Markdown content
- **Vanilla JS** (ES modules) — no framework, no bundler
- **Hand-rolled design system** — three CSS files in `src/css/`:
  - `colors_and_type.css` — design tokens + bare-element styles
  - `components.css` — `.qrt-*` component classes (panels, fields, buttons, toggles, segmented, range, disclosure, badges, prose)
  - `site.css` — app-shell helpers (container, footer, type-cards) + small refinements such as `[hidden] { display: none !important }` (needed because `.qrt-field` uses `display: flex` and would otherwise override the user-agent `[hidden]` rule)
- **QR encoding** — Nayuki's `qrcodegen` vendored at `src/js/qrcodegen.js` (compiled from the upstream TypeScript; only change is the ES module export). `src/js/qr-render.js` owns all drawing: preview, SVG, and canvas (PNG/JPEG/WebP) render from one geometry, so outputs can't diverge. Don't reintroduce a second encoder or a styling library — the two-library setup produced different codes and broke non-ASCII text.
- **Module cache-busting** — `main.js` gets `?v={{ build.version }}` from the layout; its static imports get the same query via the `<script type="importmap">` in `base.html` and `plain.html`. Add new imported modules to both import maps.

## Design system

The `design-system/` directory at the repo root is **gitignored locally but authoritative**. It contains the source-of-truth tokens, component CSS, UI kit (React reference), `HANDOFF.md`, and brand assets. When in doubt about visual conventions, read `design-system/HANDOFF.md` and `design-system/README.md` first.

If the production CSS in `src/css/` ever drifts from `design-system/colors_and_type.css` + `components.css`, the design system wins — port from there.

## Icons

Use Lucide via the `{% lucide "name" %}` Liquid shortcode (defined in `eleventy.config.js`). It reads from `node_modules/lucide-static/icons/*.svg` at build time and inlines the SVG. Don't add new icon dependencies and don't load Lucide from a CDN.

Positional args: `{% lucide "wifi" %}`, `{% lucide "wifi" 22 %}`, `{% lucide "wifi" 22 2 "extra-class" %}` (name, size px, stroke-width, extra CSS class).

## URLs and the path prefix

The site deploys under `/qr-toaster/` on GitHub Pages — `pathPrefix` is set in `eleventy.config.js`. Internal links in templates must use the `| url` filter: `{{ '/wifi/' | url }}`. The PWA `manifest.json` keeps icon paths relative so they resolve under any prefix.

## Build and deploy

```bash
npm start          # dev server with live reload at http://localhost:<port>/qr-toaster/
npm run build      # writes _site/
```

**Pushing to `main` triggers an automatic GitHub Pages deploy** via `.github/workflows/deploy.yml`. Always confirm with the user before pushing.

## Visibility toggles

Prefer the native HTML `hidden` attribute / `element.hidden = true|false` over class-based hiding. The global `[hidden] { display: none !important }` rule in `site.css` ensures this wins over component classes that set `display`.

## More context

- `README.md` — public project overview
- `CHANGELOG.md` — date-based history of shipped changes
- `design-system/HANDOFF.md` — design intent + acceptance criteria
- `design-system/README.md` — full design rationale (tone, color philosophy, layout rules)
