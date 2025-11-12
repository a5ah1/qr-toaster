# Changelog

All notable changes to QR Toaster will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Privacy page (privacy.md) with comprehensive privacy policy
  - Explains client-side processing and data handling
  - Details on local storage usage and what is/isn't persisted
  - Notes that WiFi passwords and OTP keys are never stored
  - Information about open-source libraries and third-party code
  - Self-hosting instructions
- Comprehensive favicon and icon support
  - Multi-format favicons (ICO, SVG, PNG) for broad browser compatibility
  - Apple Touch Icon (180x180px) for iOS home screen
  - PWA manifest icons (192x192px and 512x512px) for installable web app
  - Apple mobile web app title meta tag
- Comprehensive SEO metadata and discoverability improvements
  - Page-specific meta descriptions for all pages
  - Open Graph tags (og:title, og:description, og:url, og:type, og:site_name, og:image with dimensions)
  - Twitter Card metadata with large image support for better social media previews
  - Social share image (qr-toaster-og.jpeg, 1200x630px) for all pages
  - Canonical URLs for all pages
  - JSON-LD structured data (WebApplication schema)
  - Application name meta tag
  - Theme color meta tag
  - Robots meta tag allowing search engine indexing
  - XML sitemap (sitemap.xml) with all pages
  - Permissive robots.txt file
  - Site metadata data file (src/_data/site.js) for centralized configuration
- Educational documentation sections on all generator pages
  - Comprehensive format explanations with code examples
  - "How It Works" sections explaining QR code behavior
  - Device/OS compatibility information
  - Tips and best practices for each QR code type
  - Security notes for Wi-Fi and OTP/2FA pages
- Page titles (h1 headings) on all generator pages with descriptive introductions
- Semantic HTML structure with proper `<header>` and `<article>` elements for better SEO

### Changed
- Redesigned footer with comprehensive navigation and MIT license attribution
  - Three-column layout with QR Toaster description, generator links, and information links
  - Replaced copyright notice with "Open source under MIT License" link
  - Added links to all generators and Privacy page
  - Responsive design that stacks on mobile
- Adjusted three-panel layout proportions from 4-5-3 to 5-3-4 (Content-Appearance-Output)
  - Content panel expanded for more form space
  - Appearance panel narrowed with vertically stacked color controls
  - Output panel slightly expanded
- Typography plugin now properly scoped to About page only
- Documentation articles use comfortable reading width (max-w-3xl) centered on page

### Fixed
- GitHub Pages deployment configuration for repository subpath
  - Updated pathPrefix in eleventy.config.js to '/qr-toaster/'
  - Converted all hardcoded paths to use Eleventy's url filter
  - Site now works correctly at https://a5ah1.github.io/qr-toaster/
- Typography plugin no longer affects generator page font sizes
- Empty paragraph elements no longer render in Event page date/time fields
- Template content injection timing issue resolved (now waits for DOMContentLoaded)

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
