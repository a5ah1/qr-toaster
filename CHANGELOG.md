# Changelog

All notable changes to QR Toaster will be documented in this file.

This project uses date-based versioning since it's a continuously-deployed website. Each dated section represents changes that shipped on that date.

## 2026-10-12

### Changed
- Replaced both QR libraries (`qrcode-svg` and `qr-code-styling`) with a single encoder, Project Nayuki's QR Code generator library, plus an in-house renderer (`src/js/qr-render.js`)
  - Plain and styled modes now produce the same code; styling only changes the shapes drawn
  - The preview, SVG, PNG, JPEG, and WebP downloads all render from the same geometry
  - The chosen error correction level is used exactly
- PNG, JPEG, and WebP downloads no longer require advanced styling
- One "Size (px)" control now sets the download size for every format (replaces the separate resolution slider)
- Default margin is now 4 modules (the QR standard's quiet zone), and margin is measured in modules in every mode
- Wi-Fi codes no longer wrap the network name and password in quotes, and list fields in the WPA3 spec's order (T, R, S, H, P)
- Contact and event codes use CRLF line endings, as their specs require
- CI now builds with Node 24 (Node 20 reached end of life in April 2026)
- Deploy workflow updated to current GitHub Actions majors (checkout v7, setup-node v7, upload-pages-artifact v5, deploy-pages v5), which run on Node 24 and clear the Node 20 deprecation warnings

### Fixed
- Non-ASCII text (accents, curly apostrophes, CJK, emoji) was corrupted in styled mode and in emoji-containing basic codes; some emoji inputs failed to generate at all
- Basic codes no longer prefix non-ASCII content with a UTF-8 byte-order mark
- SVG downloads ignored advanced styling and always downloaded the plain code
- Styled codes had faint seams between adjacent modules
- JPEG downloads with a transparent background now get a white background instead of black
- Event codes now escape commas, semicolons, backslashes, and line breaks (multi-line descriptions were cut off, and text could inject calendar properties)
- Event codes include the required UID and DTSTAMP properties
- All-day events ended a day early (iCalendar end dates are exclusive)
- An end time before the start now shows an error instead of producing an invalid event
- Saved all-day event dates were lost on reload, and toggling all-day cleared entered dates
- Contact codes always include N and FN (required by vCard 3.0), and clearing the form now clears the code
- OTP secrets with RFC 4648 padding (`=`) or dash grouping are accepted; colons in the account or issuer, and invalid period/counter values, now show an error instead of silently clearing the code
- Wi-Fi password and WPA3 fields hid via inline styles that overrode their flex layout

### Technical
- Bumped to 0.3.0 for the QR engine change
- `qrcodegen.js` and `qr-render.js` are cache-busted through an import map in both layouts
- Removed `qrcode-svg` and `qr-code-styling` dependencies

## 2026-05-17

### Added
- Lucide icon system via `lucide-static` and a `{% lucide %}` Eleventy shortcode
  - Inlines SVGs at build time — no runtime JS, no CDN, no network calls
  - Supports size/stroke/extra-class overrides as positional args
- About-page cards now use Lucide stroke icons (link-2, wifi, contact-round, calendar, key-round) instead of emoji
- Privacy checklist marks switched to the Lucide `check` icon
- Mobile nav burger, drawer close, download button, and OTP show/hide eye toggle all use canonical Lucide icons in place of hand-rolled inline SVGs

### Changed
- Replaced Tailwind CSS v4 with a hand-rolled design system
  - New design tokens (warm "toast" amber accent, dark-only palette, system fonts)
  - New `.qrt-*` component classes for panels, fields, buttons, toggles, segmented controls, ranges, and disclosures
  - Three-panel grid now stacks below 1100px (was 1280px)
  - Mobile drawer rebuilt with `is-open` modifier instead of transform classes
  - Mobile-ready: all controls ≥44px tall, text inputs ≥16px (suppresses iOS auto-zoom)
- Updated About-page card grid and Privacy page layout to use the new design system
- Switched theme-color to match the new dark panel background
- Updated brand mark: SVG logo now wired into the nav at 28px

### Removed
- Tailwind CSS v4, PostCSS pipeline, and the `build-css.js` script
- `@tailwindcss/postcss`, `@tailwindcss/typography`, and `tailwindcss` dependencies
- `npm run build:css` and `npm run watch:css` scripts (no separate CSS build needed)

### Technical
- Bumped to 0.2.0 to mark the visible UI rewrite
- Three-file CSS load order: tokens → components → app shell, all cache-busted with `?v={{ build.version }}`

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
- Improved cache-busting warning when git is unavailable during build

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
