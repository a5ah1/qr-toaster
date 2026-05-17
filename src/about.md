---
layout: plain.html
title: About - QR Toaster
description: Learn about QR Toaster, a privacy-focused QR code generator that works entirely in your browser with no tracking or server-side processing.
permalink: /about/
---

# About QR Toaster

Create QR codes instantly, privately, and completely offline. All processing happens in your browser — no data is sent to any server.

## QR Code Types

<div class="qrt-typegrid">
  <a href="{{ '/' | url }}" class="qrt-typecard">
    <span class="qrt-typecard__icon">{% lucide "link-2" 22 %}</span>
    <div class="qrt-typecard__body">
      <h3>Text/URL</h3>
      <p>Plain text or web URLs.</p>
    </div>
  </a>

  <a href="{{ '/wifi/' | url }}" class="qrt-typecard">
    <span class="qrt-typecard__icon">{% lucide "wifi" 22 %}</span>
    <div class="qrt-typecard__body">
      <h3>Wi-Fi</h3>
      <p>Share network credentials securely.</p>
    </div>
  </a>

  <a href="{{ '/contact/' | url }}" class="qrt-typecard">
    <span class="qrt-typecard__icon">{% lucide "contact-round" 22 %}</span>
    <div class="qrt-typecard__body">
      <h3>Contact</h3>
      <p>vCard QR codes for easy contact sharing.</p>
    </div>
  </a>

  <a href="{{ '/event/' | url }}" class="qrt-typecard">
    <span class="qrt-typecard__icon">{% lucide "calendar" 22 %}</span>
    <div class="qrt-typecard__body">
      <h3>Event</h3>
      <p>Calendar event QR codes.</p>
    </div>
  </a>

  <a href="{{ '/otp/' | url }}" class="qrt-typecard">
    <span class="qrt-typecard__icon">{% lucide "key-round" 22 %}</span>
    <div class="qrt-typecard__body">
      <h3>OTP/2FA</h3>
      <p>Two-factor authentication setup for apps like Google Authenticator.</p>
    </div>
  </a>
</div>

## Privacy First

<ul class="qrt-checklist">
  <li><span class="qrt-checklist__mark">{% lucide "check" 14 2.25 %}</span> All QR code generation happens locally in your browser.</li>
  <li><span class="qrt-checklist__mark">{% lucide "check" 14 2.25 %}</span> No data is sent to any server.</li>
  <li><span class="qrt-checklist__mark">{% lucide "check" 14 2.25 %}</span> Works completely offline once loaded.</li>
  <li><span class="qrt-checklist__mark">{% lucide "check" 14 2.25 %}</span> No tracking, analytics, or cookies.</li>
</ul>
