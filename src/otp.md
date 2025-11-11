---
layout: base.html
title: OTP/2FA QR - QR Toaster
permalink: /otp/
---

<form id="otp-form" class="space-y-4">
  <h3 class="text-xl font-semibold text-white mb-4">Two-Factor Authentication (2FA)</h3>

  <!-- Account Name -->
  <div>
    <label for="account" class="block text-sm font-medium text-gray-300 mb-2">
      Account Name <span class="text-red-400">*</span>
    </label>
    <input
      type="text"
      id="account"
      placeholder="user@example.com or username"
      class="w-full rounded-md"
      required
    />
    <p class="text-xs text-gray-400 mt-1">Your email or username for this account</p>
  </div>

  <!-- Issuer -->
  <div>
    <label for="issuer" class="block text-sm font-medium text-gray-300 mb-2">
      Issuer/Service <span class="text-red-400">*</span>
    </label>
    <input
      type="text"
      id="issuer"
      placeholder="Google, GitHub, AWS, etc."
      class="w-full rounded-md"
      required
    />
    <p class="text-xs text-gray-400 mt-1">The service or provider name</p>
  </div>

  <!-- Secret Key -->
  <div>
    <label for="secret" class="block text-sm font-medium text-gray-300 mb-2">
      Secret Key <span class="text-red-400">*</span>
    </label>
    <div class="relative">
      <input
        type="password"
        id="secret"
        placeholder="Base32 encoded secret"
        class="w-full rounded-md font-mono"
        required
      />
      <button
        type="button"
        id="toggle-secret"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
        aria-label="Toggle secret visibility"
      >
        <svg id="eye-open" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <svg id="eye-closed" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      </button>
    </div>
    <p class="text-xs text-gray-400 mt-1">
      Base32 encoded (A-Z, 2-7 only).
      <button type="button" id="generate-secret" class="text-blue-400 hover:text-blue-300 underline">
        Generate random secret
      </button>
    </p>
    <p id="secret-error" class="text-xs text-red-400 mt-1 hidden">
      Invalid secret: must contain only A-Z and 2-7 characters
    </p>
  </div>

  <!-- OTP Type -->
  <div>
    <label class="block text-sm font-medium text-gray-300 mb-2">
      OTP Type <span class="text-red-400">*</span>
    </label>
    <div class="space-y-2">
      <label class="flex items-center">
        <input
          type="radio"
          name="type"
          value="totp"
          id="type-totp"
          class="rounded"
          checked
        />
        <span class="ml-2 text-gray-300">TOTP (Time-based) - Most common</span>
      </label>
      <label class="flex items-center">
        <input
          type="radio"
          name="type"
          value="hotp"
          id="type-hotp"
          class="rounded"
        />
        <span class="ml-2 text-gray-300">HOTP (Counter-based)</span>
      </label>
    </div>
  </div>

  <!-- Period (TOTP only) -->
  <div id="period-container">
    <label for="period" class="block text-sm font-medium text-gray-300 mb-2">
      Period (seconds)
    </label>
    <input
      type="number"
      id="period"
      value="30"
      min="1"
      class="w-full rounded-md"
    />
    <p class="text-xs text-gray-400 mt-1">Time step in seconds (default: 30)</p>
  </div>

  <!-- Counter (HOTP only) -->
  <div id="counter-container" class="hidden">
    <label for="counter" class="block text-sm font-medium text-gray-300 mb-2">
      Initial Counter <span class="text-red-400">*</span>
    </label>
    <input
      type="number"
      id="counter"
      value="0"
      min="0"
      class="w-full rounded-md"
    />
    <p class="text-xs text-gray-400 mt-1">Starting counter value (usually 0)</p>
  </div>

  <!-- Advanced Options -->
  <details class="border border-gray-700 rounded-lg">
    <summary class="cursor-pointer p-4 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg">
      Advanced Options
    </summary>
    <div class="p-4 space-y-4 border-t border-gray-700">
      <!-- Algorithm -->
      <div>
        <label for="algorithm" class="block text-sm font-medium text-gray-300 mb-2">
          Algorithm
        </label>
        <select id="algorithm" class="w-full rounded-md">
          <option value="SHA1">SHA1 (most compatible)</option>
          <option value="SHA256">SHA256</option>
          <option value="SHA512">SHA512</option>
        </select>
        <p class="text-xs text-gray-400 mt-1">Most authenticator apps use SHA1</p>
      </div>

      <!-- Digits -->
      <div>
        <label for="digits" class="block text-sm font-medium text-gray-300 mb-2">
          Code Digits
        </label>
        <select id="digits" class="w-full rounded-md">
          <option value="6">6 digits (standard)</option>
          <option value="8">8 digits</option>
        </select>
        <p class="text-xs text-gray-400 mt-1">Most authenticator apps use 6 digits</p>
      </div>
    </div>
  </details>

  <!-- Label Preview -->
  <div id="label-preview-container" class="bg-gray-800 p-3 rounded-lg hidden">
    <p class="text-xs text-gray-400 mb-1">Label Preview:</p>
    <p id="label-preview" class="text-sm text-gray-300 font-mono break-all"></p>
  </div>

  <!-- Security Warning -->
  <div class="bg-amber-900/20 border border-amber-700/50 rounded-lg p-3">
    <p class="text-xs text-amber-200">
      <strong>Security Notice:</strong> Keep your secret key secure. This QR code grants access to your account's two-factor authentication. The secret is not saved by this application.
    </p>
  </div>
</form>

<script>
document.addEventListener('DOMContentLoaded', () => {
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
    eyeOpen.classList.toggle('hidden');
    eyeClosed.classList.toggle('hidden');
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
    if (isTotp) {
      periodContainer.classList.remove('hidden');
      counterContainer.classList.add('hidden');
    } else {
      periodContainer.classList.add('hidden');
      counterContainer.classList.remove('hidden');
    }
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
      secretError.classList.remove('hidden');
      return null;
    } else {
      secretError.classList.add('hidden');
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
    labelPreviewContainer.classList.remove('hidden');

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
        labelPreviewContainer.classList.add('hidden');
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
