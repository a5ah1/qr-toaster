---
layout: base.html
title: OTP/2FA QR - QR Toaster
description: Generate TOTP/HOTP QR codes for two-factor authentication. Set up 2FA for your accounts with compatible authenticator apps.
permalink: /otp/
---

<!-- Page header content -->
<template id="header-content">
    <h1>Two-Factor Authentication QR Code Generator</h1>
    <p>Generate QR codes for setting up 2FA (two-factor authentication) in authenticator apps. Add an extra layer of security to your accounts.</p>
</template>

<!-- Page documentation content -->
<template id="documentation-content">
    <h2>How It Works</h2>
    <p>When you scan a 2FA QR code with an authenticator app like Google Authenticator, Authy, or 1Password, the app imports your secret key and begins generating time-based one-time passwords (TOTP) or counter-based passwords (HOTP). These codes change every 30 seconds (TOTP) and provide an additional security factor beyond your regular password.</p>

    <h2>Format Overview</h2>
    <p>2FA QR codes use the <code>otpauth://</code> URI scheme, a standardized format for provisioning OTP credentials. The structure differs slightly between TOTP and HOTP:</p>

    <h3>TOTP (Time-Based) Format</h3>
    <pre><code>otpauth://totp/GitHub:username?secret=JBSWY3DPEHPK3PXP&issuer=GitHub&algorithm=SHA1&digits=6&period=30</code></pre>

    <h3>HOTP (Counter-Based) Format</h3>
    <pre><code>otpauth://hotp/Google:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Google&counter=0&algorithm=SHA1&digits=6</code></pre>

    <p>Key parameters:</p>
    <ul>
        <li><strong>Label:</strong> Format is <code>Issuer:Account</code> (e.g., "GitHub:username")</li>
        <li><strong>secret:</strong> Base32-encoded shared secret (required)</li>
        <li><strong>issuer:</strong> Service provider name (helps organize multiple accounts)</li>
        <li><strong>algorithm:</strong> Hash algorithm (SHA1, SHA256, SHA512) - SHA1 is most compatible</li>
        <li><strong>digits:</strong> Code length (6 or 8 digits) - 6 is standard</li>
        <li><strong>period:</strong> TOTP only - seconds between code changes (default 30)</li>
        <li><strong>counter:</strong> HOTP only - starting counter value (usually 0)</li>
    </ul>

    <h2>TOTP vs HOTP</h2>
    <ul>
        <li><strong>TOTP (Time-Based):</strong> Generates codes that expire every 30 seconds. This is the most common type used by services like Google, GitHub, AWS, and most modern 2FA implementations. No synchronization needed between client and server.</li>
        <li><strong>HOTP (Counter-Based):</strong> Generates codes based on an incrementing counter. Each code is valid until used, and both the client and server must stay synchronized. Less common but useful for environments without reliable time synchronization.</li>
    </ul>

    <h2>Base32 Secret Encoding</h2>
    <p>The secret key must be Base32-encoded, which uses only uppercase letters A-Z and digits 2-7. This is different from Base64 encoding. Most services that support 2FA will provide you with a Base32-encoded secret when you enable 2FA. If you need to generate a random secret, use the "Generate random secret" button—it creates a cryptographically secure 160-bit Base32 key.</p>

    <h2>Compatible Authenticator Apps</h2>
    <ul>
        <li><strong>Google Authenticator:</strong> iOS and Android</li>
        <li><strong>Authy:</strong> iOS, Android, Desktop - supports cloud backup</li>
        <li><strong>Microsoft Authenticator:</strong> iOS and Android</li>
        <li><strong>1Password:</strong> Password manager with built-in TOTP support</li>
        <li><strong>Bitwarden:</strong> Open-source password manager with TOTP</li>
        <li><strong>FreeOTP:</strong> Open-source authenticator app</li>
        <li><strong>AndOTP:</strong> Android-only, open-source with encryption</li>
    </ul>

    <h2>Security Best Practices</h2>
    <ul>
        <li><strong>Keep your secret secure:</strong> Never share your secret key with anyone. Anyone with your secret can generate valid codes.</li>
        <li><strong>Save backup codes:</strong> When enabling 2FA on a service, save the backup/recovery codes in a secure location in case you lose access to your authenticator app.</li>
        <li><strong>Use strong secrets:</strong> Generate cryptographically random secrets with at least 128 bits of entropy (20 Base32 characters).</li>
        <li><strong>Test before finalizing:</strong> After scanning the QR code, verify that the generated codes work before completing the 2FA setup on the service.</li>
        <li><strong>Document your setup:</strong> Keep a secure record of which accounts have 2FA enabled and which authenticator app you're using.</li>
    </ul>

    <h2>Common Algorithm and Digit Settings</h2>
    <p>While the generator allows customization, most services use these standard settings for maximum compatibility:</p>
    <ul>
        <li><strong>Algorithm:</strong> SHA1 (most widely supported, despite being cryptographically weaker than SHA256/SHA512)</li>
        <li><strong>Digits:</strong> 6 digits (easier to type than 8, still provides strong security with 1 million possible combinations)</li>
        <li><strong>Period:</strong> 30 seconds (TOTP) - balances security and convenience</li>
    </ul>

    <h2>Typical Setup Flow</h2>
    <ol>
        <li>Service provides you with a secret key (or you generate one for your own application)</li>
        <li>Generate a QR code with the secret and service details</li>
        <li>Scan the QR code with your authenticator app</li>
        <li>Authenticator app begins generating 6-digit codes every 30 seconds</li>
        <li>Enter the current code on the service to verify the setup</li>
        <li>Save backup/recovery codes provided by the service</li>
    </ol>

    <h2>When to Use Each Type</h2>
    <ul>
        <li><strong>Use TOTP for:</strong> Web services, cloud platforms, social media accounts, email accounts - any service where your device has accurate time</li>
        <li><strong>Use HOTP for:</strong> Hardware tokens, embedded devices, systems without reliable time sources, or when you need codes to remain valid until used</li>
    </ul>
</template>

<form id="otp-form" class="qrt-stack">
  <h2 class="qrt-section-title">Two-factor authentication (2FA)</h2>

  <div class="qrt-field">
    <label for="account" class="qrt-label">
      <span>Account name<span class="qrt-label__required"> *</span></span>
    </label>
    <input type="text" id="account" class="qrt-input" placeholder="user@example.com or username" required>
    <p class="qrt-help">Your email or username for this account</p>
  </div>

  <div class="qrt-field">
    <label for="issuer" class="qrt-label">
      <span>Issuer / service<span class="qrt-label__required"> *</span></span>
    </label>
    <input type="text" id="issuer" class="qrt-input" placeholder="Google, GitHub, AWS, etc." required>
    <p class="qrt-help">The service or provider name</p>
  </div>

  <div class="qrt-field">
    <label for="secret" class="qrt-label">
      <span>Secret key<span class="qrt-label__required"> *</span></span>
    </label>
    <div class="qrt-input-wrap qrt-input-wrap--suffix">
      <input type="password" id="secret" class="qrt-input qrt-mono" placeholder="Base32 encoded secret" required>
      <button type="button" id="toggle-secret" class="qrt-input-wrap__suffix" aria-label="Toggle secret visibility">
        <span id="eye-open" style="display:inline-flex;">{% lucide "eye" 20 %}</span>
        <span id="eye-closed" style="display:inline-flex;" hidden>{% lucide "eye-off" 20 %}</span>
      </button>
    </div>
    <p class="qrt-help">
      Base32 encoded (A-Z, 2-7 only).
      <button type="button" id="generate-secret" style="background:none; border:0; padding:0; color: var(--color-accent); cursor: pointer; text-decoration: underline; font: inherit;">
        Generate random secret
      </button>
    </p>
    <p id="secret-error" class="qrt-help qrt-help--error" hidden>
      Invalid secret: must contain only A-Z and 2-7 characters
    </p>
  </div>

  <div class="qrt-field">
    <span class="qrt-label">
      <span>OTP type<span class="qrt-label__required"> *</span></span>
    </span>
    <div class="qrt-stack" style="--qrt-stack-gap: var(--space-1);">
      <label class="qrt-check">
        <input type="radio" name="type" value="totp" id="type-totp" checked>
        <span class="qrt-check__label">TOTP (Time-based) — Most common</span>
      </label>
      <label class="qrt-check">
        <input type="radio" name="type" value="hotp" id="type-hotp">
        <span class="qrt-check__label">HOTP (Counter-based)</span>
      </label>
    </div>
  </div>

  <div id="period-container" class="qrt-field">
    <label for="period" class="qrt-label">Period (seconds)</label>
    <input type="number" id="period" class="qrt-input" value="30" min="1">
    <p class="qrt-help">Time step in seconds (default: 30)</p>
  </div>

  <div id="counter-container" class="qrt-field" hidden>
    <label for="counter" class="qrt-label">
      <span>Initial counter<span class="qrt-label__required"> *</span></span>
    </label>
    <input type="number" id="counter" class="qrt-input" value="0" min="0">
    <p class="qrt-help">Starting counter value (usually 0)</p>
  </div>

  <details class="qrt-disclosure">
    <summary>Advanced Options</summary>
    <div class="qrt-disclosure__body qrt-stack">
      <div class="qrt-field">
        <label for="algorithm" class="qrt-label">Algorithm</label>
        <select id="algorithm" class="qrt-select">
          <option value="SHA1">SHA1 (most compatible)</option>
          <option value="SHA256">SHA256</option>
          <option value="SHA512">SHA512</option>
        </select>
        <p class="qrt-help">Most authenticator apps use SHA1</p>
      </div>

      <div class="qrt-field">
        <label for="digits" class="qrt-label">Code digits</label>
        <select id="digits" class="qrt-select">
          <option value="6">6 digits (standard)</option>
          <option value="8">8 digits</option>
        </select>
        <p class="qrt-help">Most authenticator apps use 6 digits</p>
      </div>
    </div>
  </details>

  <div id="label-preview-container" hidden style="background: var(--color-bg-sunken); border: 1px solid var(--color-line); border-radius: var(--radius-md); padding: var(--space-3);">
    <p class="qrt-help" style="margin-bottom: var(--space-1);">Label preview:</p>
    <p id="label-preview" class="qrt-mono" style="font-size: var(--text-sm); color: var(--color-fg); word-break: break-all; margin: 0;"></p>
  </div>

  <div class="qrt-warning">
    <strong>Security notice:</strong> Keep your secret key secure. This QR code grants access to your account's two-factor authentication. The secret is not saved by this application.
  </div>
</form>

<script>
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
  const form = document.getElementById('otp-form');
  const accountInput = document.getElementById('account');
  const issuerInput = document.getElementById('issuer');
  const secretInput = document.getElementById('secret');
  const typeTotp = document.getElementById('type-totp');
  const typeHotp = document.getElementById('type-hotp');
  const periodInput = document.getElementById('period');
  const counterInput = document.getElementById('counter');
  const algorithmInput = document.getElementById('algorithm');
  const digitsInput = document.getElementById('digits');

  const periodContainer = document.getElementById('period-container');
  const counterContainer = document.getElementById('counter-container');
  const secretError = document.getElementById('secret-error');
  const labelPreview = document.getElementById('label-preview');
  const labelPreviewContainer = document.getElementById('label-preview-container');

  const toggleSecretBtn = document.getElementById('toggle-secret');
  const eyeOpen = document.getElementById('eye-open');
  const eyeClosed = document.getElementById('eye-closed');
  const generateSecretBtn = document.getElementById('generate-secret');

  // Toggle secret visibility
  toggleSecretBtn.addEventListener('click', () => {
    const isPassword = secretInput.type === 'password';
    secretInput.type = isPassword ? 'text' : 'password';
    eyeOpen.hidden = !eyeOpen.hidden;
    eyeClosed.hidden = !eyeClosed.hidden;
  });

  // Generate random Base32 secret
  generateSecretBtn.addEventListener('click', () => {
    const secret = generateBase32Secret(32); // 32 characters = 160 bits
    secretInput.value = secret;
    updateOTP();
  });

  // Generate random Base32 secret using crypto API
  function generateBase32Secret(length) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    return Array.from(randomValues)
      .map(val => base32Chars[val % 32])
      .join('');
  }

  // Validate Base32 secret
  function validateSecret(secret) {
    // Remove whitespace and convert to uppercase
    const cleaned = secret.replace(/\s/g, '').toUpperCase();
    // Check if valid Base32 (A-Z, 2-7 only)
    return /^[A-Z2-7]+$/.test(cleaned);
  }

  // Toggle type-specific fields
  function updateTypeFields() {
    const isTotp = typeTotp.checked;
    periodContainer.hidden = !isTotp;
    counterContainer.hidden = isTotp;
  }

  // Build OTP URI
  function buildOTPURI() {
    const account = accountInput.value.trim();
    const issuer = issuerInput.value.trim();
    const secret = secretInput.value.replace(/\s/g, '').toUpperCase();
    const type = typeTotp.checked ? 'totp' : 'hotp';
    const algorithm = algorithmInput.value;
    const digits = digitsInput.value;
    const period = periodInput.value;
    const counter = counterInput.value;

    // Validate required fields
    if (!account || !issuer || !secret) {
      return null;
    }

    // Validate secret format
    if (!validateSecret(secret)) {
      secretError.hidden = false;
      return null;
    } else {
      secretError.hidden = true;
    }

    // Check for colons in account and issuer
    if (account.includes(':') || issuer.includes(':')) {
      return null;
    }

    // Build label (Issuer:Account)
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedAccount = encodeURIComponent(account);
    const label = `${encodedIssuer}:${encodedAccount}`;

    // Update label preview
    labelPreview.textContent = `${issuer}:${account}`;
    labelPreviewContainer.hidden = false;

    // Build URI
    let uri = `otpauth://${type}/${label}?secret=${secret}&issuer=${encodedIssuer}`;

    // Add optional parameters (only if different from defaults)
    if (algorithm !== 'SHA1') {
      uri += `&algorithm=${algorithm}`;
    }
    if (digits !== '6') {
      uri += `&digits=${digits}`;
    }
    if (type === 'totp' && period !== '30') {
      uri += `&period=${period}`;
    }
    if (type === 'hotp') {
      uri += `&counter=${counter}`;
    }

    return uri;
  }

  // Update QR code
  function updateOTP() {
    const uri = buildOTPURI();

    if (uri && window.QRToaster) {
      window.QRToaster.setContent(uri);
    } else if (!uri && window.QRToaster) {
      // Clear QR if no valid content
      window.QRToaster.setContent('');
      if (!accountInput.value && !issuerInput.value && !secretInput.value) {
        labelPreviewContainer.hidden = true;
      }
    }
  }

  // Debounced save (excluding secret for security)
  const debouncedSave = window.QRToaster?.storage.createDebouncedSave('otp');

  function saveData() {
    if (debouncedSave) {
      // Save everything EXCEPT the secret key
      debouncedSave({
        account: accountInput.value,
        issuer: issuerInput.value,
        // secret: NOT SAVED for security
        type: typeTotp.checked ? 'totp' : 'hotp',
        period: periodInput.value,
        counter: counterInput.value,
        algorithm: algorithmInput.value,
        digits: digitsInput.value
      });
    }
  }

  // Load saved data
  function loadSavedData() {
    const saved = window.QRToaster?.storage.load('otp');
    if (saved) {
      if (saved.account) accountInput.value = saved.account;
      if (saved.issuer) issuerInput.value = saved.issuer;
      // secret is never saved
      if (saved.type === 'hotp') {
        typeHotp.checked = true;
      } else {
        typeTotp.checked = true;
      }
      if (saved.period) periodInput.value = saved.period;
      if (saved.counter) counterInput.value = saved.counter;
      if (saved.algorithm) algorithmInput.value = saved.algorithm;
      if (saved.digits) digitsInput.value = saved.digits;

      updateTypeFields();
      updateOTP();
    }
  }

  // Event listeners
  accountInput.addEventListener('input', () => {
    updateOTP();
    saveData();
  });

  issuerInput.addEventListener('input', () => {
    updateOTP();
    saveData();
  });

  secretInput.addEventListener('input', () => {
    updateOTP();
    // Note: secret is NOT saved
  });

  typeTotp.addEventListener('change', () => {
    updateTypeFields();
    updateOTP();
    saveData();
  });

  typeHotp.addEventListener('change', () => {
    updateTypeFields();
    updateOTP();
    saveData();
  });

  periodInput.addEventListener('input', () => {
    updateOTP();
    saveData();
  });

  counterInput.addEventListener('input', () => {
    updateOTP();
    saveData();
  });

  algorithmInput.addEventListener('change', () => {
    updateOTP();
    saveData();
  });

  digitsInput.addEventListener('change', () => {
    updateOTP();
    saveData();
  });

  // Initialize
  loadSavedData();
  updateTypeFields();
});
</script>
