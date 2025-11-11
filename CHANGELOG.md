# Changelog

All notable changes to QR Toaster will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-01-10

### Added
- Initial release of QR Toaster
- Privacy-focused client-side QR code generation
- Multiple QR code types:
  - Text/URL - Single or multi-line text and links
  - Wi-Fi - Network credentials with security settings
  - Contact - vCard format support
  - Event - iCalendar format for calendar events
  - OTP/2FA - TOTP/HOTP setup for two-factor authentication
- Customization features:
  - Adjustable size and error correction levels (L/M/Q/H)
  - Color customization (foreground/background)
  - Transparent background option
  - Advanced styling with qr-code-styling library (lazy-loaded)
  - Multiple export formats (SVG, PNG, JPEG, WebP)
- Three-panel responsive layout (Content/Appearance/Output)
- Live preview with instant updates
- Progressive Web App (PWA) support with manifest
- Git commit hash-based cache-busting for assets
- Build info footer with commit details
- Dark theme UI with Tailwind CSS v4
- GitHub Actions deployment workflow for GitHub Pages
- Mobile-responsive navigation with slide-in menu
- MIT License
- Comprehensive README and documentation

### Technical
- Eleventy (11ty) static site generator
- Vanilla JavaScript with ES modules
- Tailwind CSS v4 with PostCSS pipeline
- qrcode-svg (~6kB) for default rendering
- qr-code-styling (~14kB) lazy-loaded for advanced features
- Zero external dependencies at runtime
- No analytics or tracking
- 100% client-side processing

[Unreleased]: https://github.com/a5ah1/qr-toaster/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/a5ah1/qr-toaster/releases/tag/v0.1.0
