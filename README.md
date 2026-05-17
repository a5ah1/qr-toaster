# QR Toaster

A privacy-focused static website for generating QR codes entirely client-side. No server-side processing, no tracking, no analytics. All operations occur locally in your browser.

## Mission

Personal use QR generator with an intuitive interface and simple development approach. Your data never leaves your device.

## Features

- **Privacy First**: 100% client-side processing — no data sent to servers
- **Multiple QR Types**:
  - Text/URL — single or multi-line text and links
  - Wi-Fi — network credentials with security settings
  - Contact — vCard format with name, phone, email, etc.
  - Event — iCalendar format for calendar events
  - OTP/2FA — TOTP/HOTP setup for two-factor authentication
- **Customization**:
  - Adjustable size and error correction levels
  - Advanced styling with gradients and colors (lazy-loaded)
  - Multiple export formats (SVG, PNG, JPEG, WebP)
- **Progressive Web App**: install as a standalone app on your device
- **Lightweight**: fast loading with code-splitting and efficient rendering

## Live Demo

_Coming soon_

## Technology Stack

- **Eleventy (11ty)** — static site generator
- **Vanilla JavaScript** — ES modules, no frameworks
- **Hand-rolled design system** — see `design-system/` for tokens, components, and the UI kit. Production CSS lives in `src/css/` (`colors_and_type.css`, `components.css`, `site.css`). System fonts only — no web fonts loaded.
- **QR Libraries**:
  - `qrcode-svg` (~6kB) — bundled for instant black-and-white SVG generation
  - `qr-code-styling` (~14kB) — lazy-loaded for advanced styling and exports

## Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/a5ah1/qr-toaster.git
cd qr-toaster
npm install
```

### Development

```bash
npm start
```

Runs the Eleventy dev server with live reload at [http://localhost:8080](http://localhost:8080).

### Build for Production

```bash
npm run build
```

Outputs a static site to `_site/`.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the Eleventy dev server with live reload |
| `npm run build` | Build production-ready static site to `_site/` |
| `npm run serve-static` | Build and serve the static site locally with `http-server` |

## Project Structure

```
qr-toaster/
├── src/
│   ├── _includes/         # Eleventy layout templates (base.html, plain.html)
│   ├── css/
│   │   ├── colors_and_type.css   # Design tokens + bare-element styles
│   │   ├── components.css        # .qrt-* component classes
│   │   └── site.css              # App-shell helpers (container, footer, etc.)
│   ├── js/                # main.js, qrcode.js, qr-code-styling.js
│   ├── index.html         # Text/URL generator (homepage)
│   ├── wifi.md            # Wi-Fi generator
│   ├── contact.md         # Contact / vCard generator
│   ├── event.md           # Event / iCalendar generator
│   ├── otp.md             # OTP / 2FA generator
│   ├── about.md           # About page
│   └── privacy.md         # Privacy policy
├── design-system/         # Local design system reference (not deployed)
├── _site/                 # Generated static site (git-ignored)
├── eleventy.config.js
└── package.json
```

## Architecture

### Rendering Flow

1. User inputs content in purpose-specific forms.
2. JavaScript serializes data into QR-compatible format.
3. Default renderer (`qrcode-svg`) generates instant SVG preview.
4. Optional: enable advanced styling to lazy-load the `qr-code-styling` module.
5. Download uses the active engine's API for export.

### UI Philosophy

- **Content controls**: collect raw data to encode.
- **Appearance controls**: manage visuals (size, colors, error correction, styling).
- Live preview updates on input changes.
- Advanced options in collapsible disclosures.
- Three-panel layout (Content / Appearance / Output) on wide screens; single column below 1100px.

## Privacy Guarantee

- **Zero server processing**: all QR generation happens in your browser.
- **No analytics or tracking**: no Google Analytics, no third-party scripts.
- **No web fonts**: nothing is loaded from third-party CDNs.
- **No network requests** after initial page load — everything works offline.
- **Open source**: audit the code yourself.

## Contributing

Contributions are welcome — please feel free to submit issues or pull requests.

### Development Notes

- Write clean, modular vanilla JavaScript with separated concerns.
- Style with the `.qrt-*` component classes and design tokens from `colors_and_type.css`. Do not introduce a utility-CSS framework.
- Ensure accessibility with ARIA labels and keyboard navigation.
- Maintain the privacy-first approach — no external network calls.

## License

[MIT License](LICENSE) — see LICENSE file for details.

## Acknowledgments

Built with privacy and simplicity in mind. No unnecessary dependencies, no bloat, just QR codes.
