---
layout: plain.html
title: Privacy Policy - QR Toaster
description: QR Toaster privacy policy - Learn how we protect your data with client-side processing, no tracking, and no servers.
permalink: /privacy/
---

# Privacy Policy

**Last updated:** 2026-05-17

## Our privacy commitment

QR Toaster is built with privacy as the foundation. Your data is yours alone. This page explains how we handle — or rather, don't handle — your information.

<div class="qrt-callout">
  <h3>The short version</h3>
  <ul>
    <li><strong>No servers involved</strong> — all QR generation happens entirely in your browser.</li>
    <li><strong>No data collection</strong> — we don't collect, store, or transmit your data anywhere.</li>
    <li><strong>No tracking</strong> — no analytics, no cookies, no fingerprinting.</li>
    <li><strong>Open source</strong> — all code is publicly available on <a href="https://github.com/a5ah1/qr-toaster" target="_blank" rel="noopener">GitHub</a>.</li>
  </ul>
</div>

## Data processing

### Client-side only

When you use QR Toaster to generate QR codes:

1. **All processing happens in your browser.** Your text, URLs, Wi-Fi credentials, contact information, event details, and authentication codes are processed entirely on your device using JavaScript.
2. **Nothing is sent to our servers.** We don't have servers that receive or process your QR code data.
3. **No third-party services.** We don't use external APIs or services that could access your data.

### Local storage

To improve your experience, QR Toaster may store some data locally in your browser.

<div class="qrt-twoup">
  <div class="qrt-twoup__card qrt-twoup__card--ok">
    <h4>What we store</h4>
    <ul>
      <li>Non-sensitive form inputs (event titles, contact names, etc.)</li>
      <li>Appearance preferences</li>
    </ul>
  </div>
  <div class="qrt-twoup__card qrt-twoup__card--no">
    <h4>What we never store</h4>
    <ul>
      <li>Wi-Fi passwords</li>
      <li>OTP / 2FA secret keys</li>
      <li>Anything you mark as sensitive</li>
    </ul>
  </div>
</div>

**You're in control.** All locally stored data stays on your device. You can clear it anytime using your browser's settings.

## Third-party code

QR Toaster uses this open-source JavaScript library to encode QR codes:

- **QR Code generator library** by Project Nayuki — QR code encoding ([MIT License](https://github.com/nayuki/QR-Code-generator/blob/master/Readme.markdown#license))

It's served from this site alongside our own rendering code, runs entirely in your browser, and doesn't communicate with external servers.

## Cookies and tracking

- **No cookies.**
- **No analytics** — no page views, no click tracking.
- **No advertising trackers.**
- **No fingerprinting.**

## Hosted version

The public version of QR Toaster is hosted on GitHub Pages. GitHub may collect standard server logs (IP addresses, access times) as part of their hosting infrastructure — we don't have access to these. See [GitHub's Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) for their practices.

## Self-hosting

You're welcome to download and host QR Toaster yourself. Clone the repository from [GitHub](https://github.com/a5ah1/qr-toaster), build, and deploy to your own server — or use it entirely offline. No connection to our servers is required once you've downloaded the code.

## Your rights and control

Since we don't collect or store your data: there's no data to delete, no data to export, no data to correct. You control all data directly in your browser. To clear locally stored preferences, use your browser's developer tools to clear local storage for this site, or clear your browser's cache and site data.

## Changes to this policy

If we make changes to this privacy policy, we'll update the "Last updated" date at the top. Significant changes will be noted in the project's [changelog](https://github.com/a5ah1/qr-toaster/blob/main/CHANGELOG.md). The policy is version-controlled on GitHub so you can see the full history.

## Open source

QR Toaster is open source (MIT License). You can review all code on [GitHub](https://github.com/a5ah1/qr-toaster), verify that we do what we say, contribute improvements, and report issues or concerns.

## Questions or concerns

If you have questions about this privacy policy or QR Toaster's privacy practices, open an issue on [GitHub](https://github.com/a5ah1/qr-toaster/issues) or review the source code to verify our privacy claims.

## Summary

<p class="qrt-quote">We can't access your data because we never receive it in the first place. Everything happens on your device. That's privacy by design.</p>
