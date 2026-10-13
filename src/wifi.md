---
layout: base.html
title: Wi-Fi QR - QR Toaster
description: Create Wi-Fi QR codes for easy network sharing. Generate codes with SSID, password, and security type for quick network access.
permalink: /wifi/
---

<!-- Page header content -->
<template id="header-content">
    <h1>Wi-Fi QR Code Generator</h1>
    <p>Share your Wi-Fi network credentials instantly—no typing required. Guests can scan and connect in seconds.</p>
</template>

<!-- Page documentation content -->
<template id="documentation-content">
    <h2>How It Works</h2>
    <p>When someone scans your Wi-Fi QR code, their device will automatically prompt them to join the network. On most modern smartphones (Android 10+, iOS 11+), the connection process is seamless—just scan and tap "Join" or "Connect".</p>

    <h2>Format Overview</h2>
    <p>Wi-Fi QR codes use the standardized <code>WIFI:</code> format, which encodes your network name (SSID), security type, password, and additional settings. The format follows this structure:</p>

    <pre><code>WIFI:T:WPA;S:NetworkName;P:password;;</code></pre>

    <p>The components are:</p>
    <ul>
        <li><strong>T:</strong> Security type (WPA, WEP, or nopass for open networks)</li>
        <li><strong>R:</strong> Optional parameter for WPA3-only networks (R:1 disables WPA2 fallback)</li>
        <li><strong>S:</strong> Network name (SSID)</li>
        <li><strong>H:</strong> Present as <code>H:true</code> when the network is hidden</li>
        <li><strong>P:</strong> Password (omitted for open networks)</li>
    </ul>

    <h3>Special Character Escaping</h3>
    <p>If your network name or password contains special characters like backslash (\), semicolon (;), comma (,), quote ("), or colon (:), they must be escaped with a backslash. Our generator handles this automatically.</p>

    <h2>Compatibility</h2>
    <ul>
        <li><strong>Android:</strong> Native support since Android 10 (via camera app or Quick Settings QR scanner)</li>
        <li><strong>iOS:</strong> Native support since iOS 11 (via Camera app)</li>
        <li><strong>Older devices:</strong> May require third-party QR scanner apps with Wi-Fi support</li>
    </ul>

    <h2>Security Notes</h2>
    <ul>
        <li><strong>WPA/WPA2/WPA3:</strong> Modern, secure encryption. WPA3 offers the strongest protection but requires compatible devices.</li>
        <li><strong>WEP:</strong> Legacy encryption, considered insecure. Only use if you have older devices that don't support WPA.</li>
        <li><strong>Open networks:</strong> No password required, but anyone can connect. Not recommended except for public/guest networks.</li>
        <li><strong>Hidden networks:</strong> Provide minimal security benefit and can cause connection issues on some devices.</li>
    </ul>

    <h2>Tips</h2>
    <ul>
        <li>Print your Wi-Fi QR code and place it where guests can easily scan it (near the entrance, in guest rooms, etc.)</li>
        <li>Consider creating separate QR codes for your main network and a guest network</li>
        <li>If you change your Wi-Fi password, remember to generate a new QR code</li>
        <li>Test the QR code with different devices to ensure compatibility</li>
    </ul>
</template>

<form id="wifi-form" class="qrt-stack">
    <h2 class="qrt-section-title">Wi-Fi network details</h2>

    <div class="qrt-field">
        <label for="wifi-ssid" class="qrt-label">
            <span>Network Name (SSID)<span class="qrt-label__required"> *</span></span>
        </label>
        <input type="text" id="wifi-ssid" class="qrt-input" placeholder="My Network" required>
    </div>

    <div class="qrt-field">
        <label for="wifi-security" class="qrt-label">Security type</label>
        <select id="wifi-security" class="qrt-select">
            <option value="WPA">WPA/WPA2/WPA3 (Recommended)</option>
            <option value="WEP">WEP (Legacy)</option>
            <option value="nopass">No password (Open)</option>
        </select>
    </div>

    <div id="password-field" class="qrt-field">
        <label for="wifi-password" class="qrt-label">Password</label>
        <input type="password" id="wifi-password" class="qrt-input" placeholder="Your network password">
        <label class="qrt-check" style="margin-top: var(--space-1);">
            <input type="checkbox" id="show-password">
            <span class="qrt-check__label">Show password</span>
        </label>
    </div>

    <label class="qrt-check">
        <input type="checkbox" id="wifi-hidden">
        <span class="qrt-check__label">Hidden network</span>
    </label>

    <details class="qrt-disclosure">
        <summary>Advanced Options</summary>
        <div class="qrt-disclosure__body">
            <div id="wpa3-option" class="qrt-field">
                <label class="qrt-check">
                    <input type="checkbox" id="wifi-wpa3-only">
                    <span class="qrt-check__label">
                        Force WPA3-only mode (disable WPA2 fallback)
                        <span class="qrt-check__hint">For WPA3 networks, prevents devices from falling back to WPA2. Only enable if your network is WPA3-only.</span>
                    </span>
                </label>
            </div>
        </div>
    </details>
</form>

<script>
// Page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Inject header and documentation content
    const headerTemplate = document.getElementById('header-content');
    const docTemplate = document.getElementById('documentation-content');
    const headerContainer = document.getElementById('page-header');
    const docContainer = document.getElementById('page-documentation');

    if (headerTemplate && headerContainer) {
        headerContainer.appendChild(headerTemplate.content.cloneNode(true));
    }
    if (docTemplate && docContainer) {
        docContainer.appendChild(docTemplate.content.cloneNode(true));
    }

    // Rest of page functionality
    const form = document.getElementById('wifi-form');
    const ssidInput = document.getElementById('wifi-ssid');
    const securitySelect = document.getElementById('wifi-security');
    const passwordInput = document.getElementById('wifi-password');
    const passwordField = document.getElementById('password-field');
    const showPasswordCheckbox = document.getElementById('show-password');
    const hiddenCheckbox = document.getElementById('wifi-hidden');
    const wpa3OnlyCheckbox = document.getElementById('wifi-wpa3-only');
    const wpa3Option = document.getElementById('wpa3-option');

    // Create debounced save function
    const debouncedSave = window.QRToaster?.storage.createDebouncedSave('wifi');

    // Escape special characters for WiFi QR code format
    // Must escape: \ ; , " :
    function escapeWiFiValue(value) {
        if (!value) return '';
        return value
            .replace(/\\/g, '\\\\')  // Backslash must be first
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/"/g, '\\"')
            .replace(/:/g, '\\:');
    }

    // Load saved data
    function loadSavedData() {
        const saved = window.QRToaster?.storage.load('wifi');
        if (saved) {
            if (saved.ssid) ssidInput.value = saved.ssid;
            if (saved.security) securitySelect.value = saved.security;
            if (saved.hidden !== undefined) hiddenCheckbox.checked = saved.hidden;
            if (saved.wpa3Only !== undefined) wpa3OnlyCheckbox.checked = saved.wpa3Only;
            // Note: We never save or restore the password for security reasons
            updatePasswordField();
            updateWPA3Option();
        }
    }

    // Save current data (excluding password)
    function saveData() {
        if (debouncedSave) {
            debouncedSave({
                ssid: ssidInput.value,
                security: securitySelect.value,
                hidden: hiddenCheckbox.checked,
                wpa3Only: wpa3OnlyCheckbox.checked
                // Password is intentionally excluded for security
            });
        }
    }

    function updatePasswordVisibility() {
        passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    }

    function updatePasswordField() {
        passwordField.hidden = securitySelect.value === 'nopass';
        if (passwordField.hidden) {
            passwordInput.value = '';
        }
        updateWPA3Option();
        updateWiFiQR();
    }

    // Show/hide WPA3-only option based on security type
    function updateWPA3Option() {
        wpa3Option.hidden = securitySelect.value !== 'WPA';
        if (wpa3Option.hidden) {
            wpa3OnlyCheckbox.checked = false;
        }
    }

    function updateWiFiQR() {
        const ssid = ssidInput.value;
        const security = securitySelect.value;
        const password = passwordInput.value;
        const hidden = hiddenCheckbox.checked;
        const wpa3Only = wpa3OnlyCheckbox.checked;

        if (!ssid) {
            if (window.QRToaster) {
                window.QRToaster.setContent('');
            }
            return;
        }

        // Build WiFi QR string with backslash escaping and no quotes. Quoted
        // values are not part of the format: iOS keeps the quotes as part of
        // the SSID/password and then fails to join.
        // Field order follows the WPA3 spec's grammar (T, R, S, H, P); other
        // readers accept any order.
        // Format: WIFI:T:security;R:1;S:escaped-ssid;H:true;P:escaped-password;;
        let wifiString = `WIFI:T:${security};`;

        // Add WPA3-only parameter if enabled (R:1 disables WPA2 fallback)
        if (security === 'WPA' && wpa3Only) {
            wifiString += 'R:1;';
        }

        wifiString += `S:${escapeWiFiValue(ssid)};`;

        if (hidden) {
            wifiString += 'H:true;';
        }

        if (security !== 'nopass' && password) {
            wifiString += `P:${escapeWiFiValue(password)};`;
        }

        wifiString += ';';

        // Update QR code
        if (window.QRToaster) {
            window.QRToaster.setContent(wifiString);
        }
    }

    // Event listeners
    ssidInput.addEventListener('input', () => {
        updateWiFiQR();
        saveData();
    });
    securitySelect.addEventListener('change', () => {
        updatePasswordField();
        saveData();
    });
    passwordInput.addEventListener('input', updateWiFiQR);
    showPasswordCheckbox.addEventListener('change', updatePasswordVisibility);
    hiddenCheckbox.addEventListener('change', () => {
        updateWiFiQR();
        saveData();
    });
    wpa3OnlyCheckbox.addEventListener('change', () => {
        updateWiFiQR();
        saveData();
    });

    // Load saved data first
    loadSavedData();

    // Initial setup
    updatePasswordField();
    updateWPA3Option();
});
</script>