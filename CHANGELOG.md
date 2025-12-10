# Changelog

All notable changes to QR Toaster will be documented in this file.

This project uses date-based versioning since it's a continuously-deployed website. Each dated section represents changes that shipped on that date.

## 2025-12-10

### Changed
- Improved vCard contact formatting for better mobile compatibility
  - Split Full Name into separate First Name and Last Name fields
  - Added N (structured name) field - critical for iOS/Android to display correct name
  - Added NICKNAME field as fallback display name for some devices
  - Added TYPE qualifiers to phone (CELL) and email (WORK) fields
- Added collapsible "Additional Details" section to Contact page
  - Job Title field
  - Full address fields (street, city, state, postal code, country)
  - Birthday field with date picker
- Added special character escaping for vCard fields (semicolons, commas, backslashes)
- Improved cache-busting warnings when git is unavailable during build

### Fixed
- Contact QR codes now display person's name instead of company name on phones
- Legacy saved contact data (single "name" field) migrates to new first/last name format

## 2025-11-12

### Added
- Privacy page with comprehensive privacy policy
  - Explains client-side processing and data handling
  - Details on local storage usage and what is/isn't persisted
  - Notes that WiFi passwords and OTP keys are never stored
  - Information about open-source libraries and third-party code
  - Self-hosting instructions
- Comprehensive favicon and icon support
  - Multi-format favicons (ICO, SVG, PNG) for broad browser compatibility
  - Apple Touch Icon (180x180px) for iOS home screen
  - PWA manifest icons (192x192px and 512x512px) for installable web app
- Comprehensive SEO metadata and discoverability improvements
  - Page-specific meta descriptions for all pages
  - Open Graph tags for social media previews
  - Twitter Card metadata with large image support
  - Social share image (1200x630px)
  - Canonical URLs, JSON-LD structured data, XML sitemap
- Educational documentation sections on all generator pages
  - Format explanations with code examples
  - Device/OS compatibility information
  - Tips and best practices for each QR code type

### Changed
- Redesigned footer with three-column layout
  - Generator links, information links, MIT license attribution
  - Responsive design that stacks on mobile
- Adjusted three-panel layout proportions (Content-Appearance-Output)
- Documentation articles use comfortable reading width

### Fixed
- GitHub Pages deployment for repository subpath (/qr-toaster/)
- JavaScript library loading paths for GitHub Pages
- Typography plugin scoped to About page only

## 2025-11-11

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
- Progressive Web App (PWA) support
- Git commit hash-based cache-busting for assets
- Dark theme UI with Tailwind CSS v4
- GitHub Actions deployment workflow
- Mobile-responsive navigation

### Technical
- Eleventy (11ty) static site generator
- Vanilla JavaScript with ES modules
- Tailwind CSS v4 with PostCSS pipeline
- qrcode-svg (~6kB) for default rendering
- qr-code-styling (~14kB) lazy-loaded for advanced features
- Zero external dependencies at runtime
- No analytics or tracking
- 100% client-side processing
