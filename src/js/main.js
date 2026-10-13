import { encode, renderSVG, paintCanvas, QREncodeError } from './qr-render.js';

// Style used when advanced styling is off
const PLAIN_STYLE = {
    dotType: 'square',
    cornerSquareType: 'square',
    cornerDotType: 'square',
    backgroundRound: 0
};

// State management
const state = {
    content: '',
    options: {
        size: 1000,
        previewSize: 240,
        foreground: '#000000',
        background: '#FFFFFF',
        transparentBackground: false,
        ecl: 'M',
        margin: 4
    },
    stylingEnabled: false,
    styleOptions: { ...PLAIN_STYLE },
    encoded: null // { key, qr } cache of the last encoded content
};

// DOM elements cache
const elements = {};

// Module scripts run after the document is parsed, so the DOM is usually
// ready already. Page scripts may have called setContent() first, so render
// whatever content is waiting.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    cacheElements();
    setupEventListeners();
    syncColorDisplay(elements.fgColor);
    syncColorDisplay(elements.bgColor);
    updateContentDisplay(state.content);
    regenerateQR();
}

// Cache frequently accessed DOM elements
function cacheElements() {
    elements.preview = document.getElementById('qr-preview');
    elements.contentDisplay = document.getElementById('qr-content-display');
    elements.sizeInput = document.getElementById('qr-size');
    elements.marginInput = document.getElementById('qr-margin');
    elements.fgColor = document.getElementById('qr-fg-color');
    elements.bgColor = document.getElementById('qr-bg-color');
    elements.transparentBg = document.getElementById('transparent-background');
    elements.enableStyling = document.getElementById('enable-styling');
    elements.errorCorrection = document.getElementById('error-correction');
    elements.downloadBtn = document.getElementById('download-btn');
    elements.downloadFormat = document.getElementById('download-format');

    // Styling options
    elements.stylingOptions = document.getElementById('styling-options');
    elements.dotStyle = document.getElementById('dot-style');
    elements.cornerSquareStyle = document.getElementById('corner-square-style');
    elements.cornerDotStyle = document.getElementById('corner-dot-style');
    elements.backgroundRound = document.getElementById('background-round');
    elements.backgroundRoundValue = document.getElementById('background-round-value');

    // Mobile menu elements
    elements.mobileMenuButton = document.getElementById('mobile-menu-button');
    elements.mobileMenu = document.getElementById('mobile-menu');
    elements.mobileMenuClose = document.getElementById('mobile-menu-close');
    elements.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
}

// Set up event listeners
function setupEventListeners() {
    // Appearance controls
    elements.sizeInput?.addEventListener('input', handleSizeChange);
    elements.marginInput?.addEventListener('input', handleMarginChange);
    elements.fgColor?.addEventListener('input', handleColorChange);
    elements.bgColor?.addEventListener('input', handleColorChange);
    elements.transparentBg?.addEventListener('change', handleTransparentBgToggle);
    elements.enableStyling?.addEventListener('change', handleStylingToggle);
    elements.errorCorrection?.addEventListener('change', handleErrorCorrectionChange);

    // Styling controls
    elements.dotStyle?.addEventListener('change', handleDotStyleChange);
    elements.cornerSquareStyle?.addEventListener('change', handleCornerSquareChange);
    elements.cornerDotStyle?.addEventListener('change', handleCornerDotChange);
    elements.backgroundRound?.addEventListener('input', handleBackgroundRoundChange);

    // Download controls
    elements.downloadBtn?.addEventListener('click', handleDownload);

    // Mobile menu controls
    elements.mobileMenuButton?.addEventListener('click', openMobileMenu);
    elements.mobileMenuClose?.addEventListener('click', closeMobileMenu);
    elements.mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

    // Content-specific listeners will be added by individual pages
}

// Handle size input change (download size only; the preview scales with CSS)
function handleSizeChange() {
    const newSize = parseInt(elements.sizeInput.value);
    if (!isNaN(newSize) && newSize >= 100 && newSize <= 4000) {
        state.options.size = newSize;
    }
}

// Handle margin change
function handleMarginChange() {
    const newMargin = parseInt(elements.marginInput.value);
    if (!isNaN(newMargin) && newMargin >= 0 && newMargin <= 10) {
        state.options.margin = newMargin;
        regenerateQR();
    }
}

// Handle color changes
function handleColorChange(event) {
    state.options.foreground = elements.fgColor.value;
    state.options.background = elements.bgColor.value;
    syncColorDisplay(event?.target);
    regenerateQR();
}

// Sync .qrt-color swatch + hex value with the native color input
function syncColorDisplay(input) {
    if (!input) return;
    const wrap = input.closest('.qrt-color');
    if (!wrap) return;
    wrap.style.setProperty('--swatch', input.value);
    const valueEl = wrap.querySelector('.qrt-color__value');
    if (valueEl) valueEl.textContent = input.value.toUpperCase();
}

// Handle transparent background toggle
function handleTransparentBgToggle() {
    state.options.transparentBackground = elements.transparentBg.checked;
    // Disable/enable background color picker based on transparency
    if (elements.bgColor) {
        elements.bgColor.disabled = state.options.transparentBackground;
    }
    regenerateQR();
}

// Handle dot style change
function handleDotStyleChange() {
    state.styleOptions.dotType = elements.dotStyle.value;
    regenerateQR();
}

// Handle corner square style change
function handleCornerSquareChange() {
    state.styleOptions.cornerSquareType = elements.cornerSquareStyle.value;
    regenerateQR();
}

// Handle corner dot style change
function handleCornerDotChange() {
    state.styleOptions.cornerDotType = elements.cornerDotStyle.value;
    regenerateQR();
}

// Handle background rounding change
function handleBackgroundRoundChange() {
    state.styleOptions.backgroundRound = parseFloat(elements.backgroundRound.value);
    if (elements.backgroundRoundValue) {
        elements.backgroundRoundValue.textContent = elements.backgroundRound.value;
    }
    regenerateQR();
}

// Handle styling toggle
function handleStylingToggle() {
    state.stylingEnabled = elements.enableStyling.checked;
    if (elements.stylingOptions) {
        elements.stylingOptions.hidden = !state.stylingEnabled;
    }
    regenerateQR();
}

// Mobile menu functions
function openMobileMenu() {
    elements.mobileMenu.classList.add('is-open');
    elements.mobileMenu.setAttribute('aria-hidden', 'false');
    elements.mobileMenuOverlay.classList.add('is-open');
    elements.mobileMenuButton?.setAttribute('aria-expanded', 'true');
    // Prevent scrolling when menu is open
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    elements.mobileMenu.classList.remove('is-open');
    elements.mobileMenu.setAttribute('aria-hidden', 'true');
    elements.mobileMenuOverlay.classList.remove('is-open');
    elements.mobileMenuButton?.setAttribute('aria-expanded', 'false');
    // Re-enable scrolling
    document.body.style.overflow = '';
}

// Update content display
function updateContentDisplay(content) {
    if (elements.contentDisplay) {
        elements.contentDisplay.textContent = content || 'No content';
        elements.contentDisplay.classList.toggle('qrt-raw--empty', !content);
    }
}

// Handle error correction level change
function handleErrorCorrectionChange() {
    state.options.ecl = elements.errorCorrection.value;
    regenerateQR();
}

// Encode the current content, reusing the last result when nothing changed
function currentQR() {
    const key = state.options.ecl + '\n' + state.content;
    if (state.encoded?.key !== key) {
        state.encoded = { key, qr: encode(state.content, state.options.ecl) };
    }
    return state.encoded.qr;
}

// Options shared by the preview and every download format
function renderOptions() {
    return {
        margin: state.options.margin,
        foreground: state.options.foreground,
        background: state.options.transparentBackground ? null : state.options.background,
        ...(state.stylingEnabled ? state.styleOptions : PLAIN_STYLE)
    };
}

// User-facing message for an encoding failure
function encodeErrorMessage(error) {
    if (error instanceof QREncodeError) return error.message;
    console.error('QR generation error:', error);
    return 'Error generating QR code.';
}

// Regenerate QR code preview
function regenerateQR() {
    if (!elements.preview) return;

    if (!state.content) {
        elements.preview.innerHTML = '<p class="qr-preview__empty">QR code preview will appear here</p>';
        return;
    }

    try {
        elements.preview.innerHTML = renderSVG(currentQR(), {
            ...renderOptions(),
            size: state.options.previewSize
        });
    } catch (error) {
        const message = document.createElement('p');
        message.className = 'qr-preview__empty qr-preview__error';
        message.textContent = encodeErrorMessage(error);
        elements.preview.replaceChildren(message);
    }
}

// Handle download
async function handleDownload() {
    if (!state.content) {
        alert('Please enter content to generate a QR code');
        return;
    }

    let qr;
    try {
        qr = currentQR();
    } catch (error) {
        alert(encodeErrorMessage(error));
        return;
    }

    const format = elements.downloadFormat.value;
    const options = renderOptions();
    const size = state.options.size;

    try {
        if (format === 'svg') {
            const svg = renderSVG(qr, { ...options, size });
            saveBlob(new Blob([svg], { type: 'image/svg+xml' }), 'qrcode.svg');
        } else {
            const blob = await rasterize(qr, options, size, `image/${format}`);
            saveBlob(blob, `qrcode.${blob.type === 'image/jpeg' ? 'jpg' : blob.type.split('/')[1]}`);
        }
    } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading QR code');
    }
}

// Draw the QR code onto a canvas and export it as an image blob
function rasterize(qr, options, size, mimeType) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // JPEG has no alpha channel; without this, transparent areas turn black
    if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
    }
    paintCanvas(ctx, qr, options, size);

    // Browsers that can't encode the requested type (e.g. WebP in older
    // Safari) fall back to PNG; the caller names the file from blob.type.
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))), mimeType, 0.92);
    });
}

// Trigger a file download for a blob
function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoking synchronously can cancel the download in some browsers
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Storage utilities for form persistence
const STORAGE_PREFIX = 'qr-toaster:';

// Debounce utility
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Save page data to sessionStorage
function savePageData(pageName, data) {
    try {
        const key = STORAGE_PREFIX + pageName;
        sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        // Silently fail if sessionStorage is unavailable
        console.warn('Failed to save page data:', error);
    }
}

// Load page data from sessionStorage
function loadPageData(pageName) {
    try {
        const key = STORAGE_PREFIX + pageName;
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        // Silently fail if sessionStorage is unavailable
        console.warn('Failed to load page data:', error);
        return null;
    }
}

// Create debounced save function for a page
function createDebouncedSave(pageName, delay = 500) {
    return debounce((data) => savePageData(pageName, data), delay);
}

// Public API for page-specific functionality
window.QRToaster = {
    // Update content and regenerate
    async setContent(content) {
        state.content = content;
        updateContentDisplay(content);
        regenerateQR();
    },

    // Get current state
    getState() {
        return state;
    },

    // Force regeneration
    async regenerate() {
        regenerateQR();
    },

    // Storage utilities
    storage: {
        save: savePageData,
        load: loadPageData,
        createDebouncedSave: createDebouncedSave
    }
};
