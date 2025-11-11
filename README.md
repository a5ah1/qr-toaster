# QR Toaster

A privacy-focused static website for generating QR codes entirely client-side. No server-side processing, no tracking, no analytics. All operations occur locally in your browser.

## Mission

Personal use QR generator with an intuitive interface and simple development approach. Your data never leaves your device.

## Features

- **Privacy First**: 100% client-side processing - no data sent to servers
- **Multiple QR Types**:
  - Text/URL - Single or multi-line text and links
  - Wi-Fi - Network credentials with security settings
  - Contact - vCard format with name, phone, email, etc.
  - Event - iCalendar format for calendar events
  - OTP/2FA - TOTP/HOTP setup for two-factor authentication
- **Customization**:
  - Adjustable size and error correction levels
  - Advanced styling with gradients and colors (lazy-loaded)
  - Logo embedding support
  - Multiple export formats (SVG, PNG, JPEG, WEBP)
- **Progressive Web App**: Install as standalone app on your device
- **Lightweight**: Fast loading with code-splitting and efficient rendering

## Live Demo

_Coming soon_

## Technology Stack

- **Eleventy (11ty)** - Static site generator
- **Vanilla JavaScript** - ES modules, no frameworks
- **Tailwind CSS v4** - Utility-first styling
- **QR Libraries**:
  - `qrcode-svg` (~6kB) - Bundled for instant black-and-white SVG generation
  - `qr-code-styling` (~14kB) - Lazy-loaded for advanced styling and exports

## Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/a5ah1/qr-toaster.git
cd qr-toaster

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:8080)
npm start
```

This runs Tailwind CSS in watch mode alongside the Eleventy dev server with live reload.

### Build for Production

```bash
# Build static site to _site/ directory
npm run build
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with CSS watch and live reload |
| `npm run build` | Build production-ready static site |
| `npm run build:css` | Build and minify CSS for production |
| `npm run watch:css` | Watch and compile Tailwind CSS during development |
| `npm run serve-static` | Build and serve static site locally |

## Project Structure

```
qr-toaster/
├── src/
│   ├── _includes/        # Eleventy layout templates
│   ├── css/
│   │   ├── styles.css    # Tailwind CSS input
│   │   └── output.css    # Generated CSS output (git-ignored)
│   ├── js/               # JavaScript modules
│   ├── index.md          # Homepage
│   ├── text.md           # Text/URL page
│   ├── wifi.md           # Wi-Fi page
│   ├── contact.md        # Contact/vCard page
│   ├── event.md          # Event/iCalendar page
│   └── otp.md            # OTP/2FA page
├── _site/                # Generated static site (git-ignored)
├── eleventy.config.js    # Eleventy configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── package.json
```

## Architecture

### Rendering Flow

1. User inputs content in purpose-specific forms
2. JavaScript serializes data into QR-compatible format
3. Default renderer (`qrcode-svg`) generates instant SVG preview
4. Optional: Enable advanced styling to lazy-load `qr-code-styling` module
5. Download uses active engine's API for export

### UI Philosophy

- **Content Controls**: Collect raw data to encode
- **Appearance Controls**: Manage visuals (size, colors, error-correction, styling)
- Live preview updates on input changes
- Advanced options in collapsible accordions
- Responsive design for mobile and desktop

## Privacy Guarantee

- **Zero server processing**: All QR generation happens in your browser
- **No analytics or tracking**: No Google Analytics, no third-party scripts
- **No network requests**: After initial page load, everything works offline
- **Open source**: Audit the code yourself - it's all here

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Notes

- Write clean, modular vanilla JavaScript with separated concerns
- Use Tailwind utility classes for styling
- Ensure accessibility with ARIA labels and keyboard navigation
- Maintain privacy-first approach - no external network calls

## Tailwind CSS v4

This project uses Tailwind CSS v4, which has some important differences from v3:

- PostCSS plugin is in separate `@tailwindcss/postcss` package
- Build scripts use `postcss` CLI (not `tailwindcss` CLI)
- Config in `postcss.config.js` must reference `'@tailwindcss/postcss'`

## License

[MIT License](LICENSE) - see LICENSE file for details

## Acknowledgments

Built with privacy and simplicity in mind. No unnecessary dependencies, no bloat, just QR codes.
