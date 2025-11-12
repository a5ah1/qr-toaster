---
layout: base.html
title: Wi-Fi QR - QR Toaster
description: Create Wi-Fi QR codes for easy network sharing. Generate codes with SSID, password, and security type for quick network access.
permalink: /wifi/
---

<!-- Page header content -->
<template id="header-content">
    <h1 class="text-3xl font-bold text-gray-100 mb-3">Wi-Fi QR Code Generator</h1>
    <p class="text-gray-300 text-lg">Share your Wi-Fi network credentials instantly—no typing required. Guests can scan and connect in seconds.</p>
</template>

<!-- Page documentation content -->
<template id="documentation-content">
    <h2>How It Works</h2>
    <p>When someone scans your Wi-Fi QR code, their device will automatically prompt them to join the network. On most modern smartphones (Android 10+, iOS 11+), the connection process is seamless—just scan and tap "Join" or "Connect".</p>

    <h2>Format Overview</h2>
    <p>Wi-Fi QR codes use the standardized <code>WIFI:</code> format, which encodes your network name (SSID), security type, password, and additional settings. The format follows this structure:</p>

    <pre><code>WIFI:S:"NetworkName";T:WPA;P:"password";H:false;;</code></pre>

    <p>The components are:</p>
    <ul>
        <li><strong>S:</strong> Network name (SSID) enclosed in quotes</li>
        <li><strong>T:</strong> Security type (WPA, WEP, or nopass for open networks)</li>
        <li><strong>P:</strong> Password enclosed in quotes (omitted for open networks)</li>
        <li><strong>H:</strong> Whether the network is hidden (true/false)</li>
        <li><strong>R:</strong> Optional parameter for WPA3-only networks (R:1 disables WPA2 fallback)</li>
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

<form id="wifi-form" class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-100 mb-4">Wi-Fi Network Details</h3>
    
    <!-- Network Name (SSID) -->
    <div>
        <label for="wifi-ssid" class="block text-sm font-medium text-gray-300 mb-2">
            Network Name (SSID) *
        </label>
        <input 
            type="text" 
            id="wifi-ssid" 
            class="w-full rounded-md"
            placeholder="My Network"
            required
        >
    </div>
    
    <!-- Security Type -->
    <div>
        <label for="wifi-security" class="block text-sm font-medium text-gray-300 mb-2">
            Security Type
        </label>
        <select
            id="wifi-security"
            class="w-full rounded-md"
        >
            <option value="WPA">WPA/WPA2/WPA3 (Recommended)</option>
            <option value="WEP">WEP (Legacy)</option>
            <option value="nopass">No Password (Open)</option>
        </select>
    </div>
    
    <!-- Password -->
    <div id="password-field">
        <label for="wifi-password" class="block text-sm font-medium text-gray-300 mb-2">
            Password
        </label>
        <input 
            type="password" 
            id="wifi-password" 
            class="w-full rounded-md"
            placeholder="Your network password"
        >
        <div class="flex items-center mt-2">
            <input 
                type="checkbox" 
                id="show-password" 
                class="rounded"
            >
            <label for="show-password" class="ml-2 text-sm text-gray-300">
                Show password
            </label>
        </div>
    </div>
    
    <!-- Hidden Network -->
    <div class="flex items-center">
        <input
            type="checkbox"
            id="wifi-hidden"
            class="rounded text-indigo-600 focus:ring-indigo-500"
        >
        <label for="wifi-hidden" class="ml-2 text-sm text-gray-300">
            Hidden network
        </label>
    </div>

    <!-- Advanced Options -->
    <details class="border border-gray-700 rounded-lg">
        <summary class="cursor-pointer p-4 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg">
            Advanced Options
        </summary>
        <div class="p-4 space-y-4 border-t border-gray-700">
            <!-- WPA3-Only Mode -->
            <div id="wpa3-option">
                <div class="flex items-center">
                    <input
                        type="checkbox"
                        id="wifi-wpa3-only"
                        class="rounded"
                    >
                    <label for="wifi-wpa3-only" class="ml-2 text-sm text-gray-300">
                        Force WPA3-only mode (disable WPA2 fallback)
                    </label>
                </div>
                <p class="text-xs text-gray-400 mt-2 ml-6">
                    For WPA3 networks, enabling this prevents devices from falling back to WPA2. Only enable if your network is WPA3-only.
                </p>
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
        if (securitySelect.value === 'nopass') {
            passwordField.style.display = 'none';
            passwordInput.value = '';
        } else {
            passwordField.style.display = 'block';
        }
        updateWPA3Option();
        updateWiFiQR();
    }

    // Show/hide WPA3-only option based on security type
    function updateWPA3Option() {
        if (securitySelect.value === 'WPA') {
            wpa3Option.style.display = 'block';
        } else {
            wpa3Option.style.display = 'none';
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

        // Build WiFi QR string with proper escaping and quoting
        // Format: WIFI:S:"escaped-ssid";T:security;P:"escaped-password";H:true;R:1;;
        const escapedSsid = escapeWiFiValue(ssid);
        const escapedPassword = escapeWiFiValue(password);

        let wifiString = `WIFI:S:"${escapedSsid}";T:${security};`;

        if (security !== 'nopass' && password) {
            wifiString += `P:"${escapedPassword}";`;
        }

        if (hidden) {
            wifiString += 'H:true;';
        }

        // Add WPA3-only parameter if enabled (R:1 disables WPA2 fallback)
        if (security === 'WPA' && wpa3Only) {
            wifiString += 'R:1;';
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