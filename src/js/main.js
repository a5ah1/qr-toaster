// QR Code libraries will be loaded dynamically

// State management
const state = {
    content: '',
    options: {
        size: 300,
        previewSize: 250,
        foreground: '#000000',
        background: '#FFFFFF',
        transparentBackground: false,
        ecl: 'M',
        margin: 1
    },
    stylingEnabled: false,
    stylingModule: null,
    styleOptions: {
        dotType: 'square',
        cornerSquareType: 'square',
        cornerDotType: 'square',
        backgroundRound: 0
    }
};

// DOM elements cache
const elements = {};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    setupEventListeners();
    updateSizeDisplay();
    updateResolutionDisplay();
});

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
    elements.resolutionControl = document.getElementById('resolution-control');
    elements.resolutionSlider = document.getElementById('download-resolution');
    elements.resolutionValue = document.getElementById('resolution-value');

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
    elements.downloadFormat?.addEventListener('change', handleFormatChange);
    elements.resolutionSlider?.addEventListener('input', updateResolutionDisplay);

    // Mobile menu controls
    elements.mobileMenuButton?.addEventListener('click', openMobileMenu);
    elements.mobileMenuClose?.addEventListener('click', closeMobileMenu);
    elements.mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

    // Content-specific listeners will be added by individual pages
}

// Handle size input change
async function handleSizeChange() {
    const newSize = parseInt(elements.sizeInput.value);
    if (!isNaN(newSize) && newSize >= 100 && newSize <= 2000) {
        state.options.size = newSize;
    }
}

// Update size display
function updateSizeDisplay() {
    // No longer needed with number input
}

// Handle margin change
async function handleMarginChange() {
    const newMargin = parseInt(elements.marginInput.value);
    if (!isNaN(newMargin) && newMargin >= 0 && newMargin <= 10) {
        state.options.margin = newMargin;
        await regenerateQR();
    }
}

// Handle color changes
async function handleColorChange() {
    state.options.foreground = elements.fgColor.value;
    state.options.background = elements.bgColor.value;
    await regenerateQR();
}

// Handle transparent background toggle
async function handleTransparentBgToggle() {
    state.options.transparentBackground = elements.transparentBg.checked;
    // Disable/enable background color picker based on transparency
    if (elements.bgColor) {
        elements.bgColor.disabled = state.options.transparentBackground;
    }
    await regenerateQR();
}

// Handle dot style change
async function handleDotStyleChange() {
    state.styleOptions.dotType = elements.dotStyle.value;
    await regenerateQR();
}

// Handle corner square style change
async function handleCornerSquareChange() {
    state.styleOptions.cornerSquareType = elements.cornerSquareStyle.value;
    await regenerateQR();
}

// Handle corner dot style change
async function handleCornerDotChange() {
    state.styleOptions.cornerDotType = elements.cornerDotStyle.value;
    await regenerateQR();
}

// Handle background rounding change
async function handleBackgroundRoundChange() {
    state.styleOptions.backgroundRound = parseFloat(elements.backgroundRound.value);
    if (elements.backgroundRoundValue) {
        elements.backgroundRoundValue.textContent = elements.backgroundRound.value;
    }
    await regenerateQR();
}

// Handle styling toggle
async function handleStylingToggle() {
    state.stylingEnabled = elements.enableStyling.checked;

    if (state.stylingEnabled && !state.stylingModule) {
        try {
            // Load styling module from local file
            if (!window.QRCodeStyling) {
                await loadQRCodeStylingLibrary();
            }
            state.stylingModule = window.QRCodeStyling;
        } catch (error) {
            console.error('Failed to load styling module:', error);
            state.stylingEnabled = false;
            elements.enableStyling.checked = false;
            alert('Failed to load advanced styling. Using basic QR generation.');
            return;
        }
    }

    // Show/hide styling options panel
    if (elements.stylingOptions) {
        if (state.stylingEnabled) {
            elements.stylingOptions.classList.remove('hidden');
        } else {
            elements.stylingOptions.classList.add('hidden');
        }
    }

    // Update format options
    updateFormatOptions();
    await regenerateQR();
}

// Load QR code styling library
async function loadQRCodeStylingLibrary() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        // Use import.meta.url to get path relative to this module
        script.src = new URL('qr-code-styling.js', import.meta.url).href;
        script.onload = () => {
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Update format dropdown based on styling state
function updateFormatOptions() {
    const formats = elements.downloadFormat.options;
    for (let i = 0; i < formats.length; i++) {
        const option = formats[i];
        if (option.value !== 'svg') {
            option.disabled = !state.stylingEnabled;
            if (option.disabled) {
                option.text = option.text.replace(' (enable styling)', '') + ' (enable styling)';
            } else {
                option.text = option.text.replace(' (enable styling)', '');
            }
        }
    }
    
    // Reset to SVG if current format is disabled
    if (elements.downloadFormat.value !== 'svg' && !state.stylingEnabled) {
        elements.downloadFormat.value = 'svg';
        handleFormatChange();
    }
}

// Handle format change
function handleFormatChange() {
    const format = elements.downloadFormat.value;
    if (format !== 'svg' && state.stylingEnabled) {
        elements.resolutionControl.classList.remove('hidden');
    } else {
        elements.resolutionControl.classList.add('hidden');
    }
}

// Update resolution display
function updateResolutionDisplay() {
    if (elements.resolutionValue) {
        elements.resolutionValue.textContent = elements.resolutionSlider.value;
    }
}

// Mobile menu functions
function openMobileMenu() {
    elements.mobileMenu.classList.remove('translate-x-full');
    elements.mobileMenu.setAttribute('aria-hidden', 'false');
    elements.mobileMenuOverlay.classList.remove('hidden');
    // Prevent scrolling when menu is open
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    elements.mobileMenu.classList.add('translate-x-full');
    elements.mobileMenu.setAttribute('aria-hidden', 'true');
    elements.mobileMenuOverlay.classList.add('hidden');
    // Re-enable scrolling
    document.body.style.overflow = '';
}

// Update content display
function updateContentDisplay(content) {
    if (elements.contentDisplay) {
        elements.contentDisplay.textContent = content || 'No content';
    }
}

// Handle error correction level change
async function handleErrorCorrectionChange() {
    state.options.ecl = elements.errorCorrection.value;
    await regenerateQR();
}

// Regenerate QR code
async function regenerateQR() {
    if (!state.content) {
        elements.preview.innerHTML = '<p class="text-gray-500 text-sm">QR code preview will appear here</p>';
        return;
    }
    
    if (state.stylingEnabled && state.stylingModule) {
        await generateStyledQR();
    } else {
        await generateBasicQR();
    }
}

// Generate basic QR code using qrcode-svg
async function generateBasicQR() {
    try {
        // Load QR code library if not already loaded
        if (!window.QRCode) {
            await loadQRCodeLibrary();
        }

        const qr = new window.QRCode({
            content: state.content,
            padding: state.options.margin,
            width: state.options.previewSize,
            height: state.options.previewSize,
            color: state.options.foreground,
            background: state.options.transparentBackground ? 'transparent' : state.options.background,
            ecl: state.options.ecl,
            join: true,  // Optimize SVG by merging paths
            container: 'svg-viewbox'  // Responsive SVG with viewBox
        });

        const svg = qr.svg();
        elements.preview.innerHTML = svg;
    } catch (error) {
        console.error('QR generation error:', error);
        elements.preview.innerHTML = '<p class="text-red-500 text-sm">Error generating QR code</p>';
    }
}

// Load QR code library
async function loadQRCodeLibrary() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        // Use import.meta.url to get path relative to this module
        script.src = new URL('qrcode.js', import.meta.url).href;
        script.onload = () => {
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Generate styled QR code using qr-code-styling
async function generateStyledQR() {
    try {
        const qrCode = new state.stylingModule({
            width: state.options.previewSize,
            height: state.options.previewSize,
            type: 'svg',
            data: state.content,
            margin: state.options.margin,
            dotsOptions: {
                color: state.options.foreground,
                type: state.styleOptions.dotType
            },
            backgroundOptions: {
                color: state.options.transparentBackground ? 'transparent' : state.options.background,
                round: state.styleOptions.backgroundRound
            },
            cornersSquareOptions: {
                type: state.styleOptions.cornerSquareType,
                color: state.options.foreground
            },
            cornersDotOptions: {
                type: state.styleOptions.cornerDotType,
                color: state.options.foreground
            },
            qrOptions: {
                errorCorrectionLevel: state.options.ecl
            }
        });

        elements.preview.innerHTML = '';
        const container = document.createElement('div');
        container.style.width = `${state.options.previewSize}px`;
        container.style.height = `${state.options.previewSize}px`;
        elements.preview.appendChild(container);
        qrCode.append(container);
    } catch (error) {
        console.error('Styled QR generation error:', error);
        // Fallback to basic
        await generateBasicQR();
    }
}

// Handle download
async function handleDownload() {
    if (!state.content) {
        alert('Please enter content to generate a QR code');
        return;
    }
    
    const format = elements.downloadFormat.value;
    
    if (format === 'svg' || !state.stylingEnabled) {
        await downloadSVG();
    } else {
        await downloadRaster(format);
    }
}

// Download SVG
async function downloadSVG() {
    try {
        // Generate a new QR at the requested size
        const qr = new window.QRCode({
            content: state.content,
            padding: state.options.margin,
            width: state.options.size,
            height: state.options.size,
            color: state.options.foreground,
            background: state.options.transparentBackground ? 'transparent' : state.options.background,
            ecl: state.options.ecl,
            join: true,  // Optimize SVG by merging paths
            container: 'svg-viewbox'  // Responsive SVG with viewBox
        });

        const svgData = qr.svg();
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.svg';
        a.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading QR code');
    }
}

// Download raster format
async function downloadRaster(format) {
    if (!state.stylingModule || !state.stylingEnabled) return;

    const resolution = parseInt(elements.resolutionSlider.value);

    try {
        const qrCode = new state.stylingModule({
            width: resolution,
            height: resolution,
            type: format,
            data: state.content,
            margin: state.options.margin,
            dotsOptions: {
                color: state.options.foreground,
                type: state.styleOptions.dotType
            },
            backgroundOptions: {
                color: state.options.transparentBackground ? 'transparent' : state.options.background,
                round: state.styleOptions.backgroundRound
            },
            cornersSquareOptions: {
                type: state.styleOptions.cornerSquareType,
                color: state.options.foreground
            },
            cornersDotOptions: {
                type: state.styleOptions.cornerDotType,
                color: state.options.foreground
            },
            qrOptions: {
                errorCorrectionLevel: state.options.ecl
            }
        });

        qrCode.download({
            name: 'qrcode',
            extension: format
        });
    } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading QR code');
    }
}

// Storage utilities for form persistence
const STORAGE_PREFIX = 'qr-toaster:';
let saveTimers = {};

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
        await regenerateQR();
    },

    // Get current state
    getState() {
        return state;
    },

    // Force regeneration
    async regenerate() {
        await regenerateQR();
    },

    // Storage utilities
    storage: {
        save: savePageData,
        load: loadPageData,
        createDebouncedSave: createDebouncedSave
    }
};