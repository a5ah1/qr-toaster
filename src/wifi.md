---
layout: base.html
title: Wi-Fi QR - QR Toaster
permalink: /wifi/
---

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