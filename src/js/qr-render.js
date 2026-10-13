// QR encoding and rendering.
//
// One encoder (qrcodegen) produces the module grid, and one geometry builder
// turns that grid into SVG path data. The preview, SVG downloads, and raster
// (PNG/JPEG/WebP) downloads all draw from the same geometry, so every output
// is the same code. Nothing here touches the DOM except paintCanvas(), which
// is only called in the browser, so the module also loads in Node for tests.

import qrcodegen from './qrcodegen.js';

const { QrCode, QrSegment } = qrcodegen;

const ECC = {
    L: QrCode.Ecc.LOW,
    M: QrCode.Ecc.MEDIUM,
    Q: QrCode.Ecc.QUARTILE,
    H: QrCode.Ecc.HIGH
};

const COLOR_PATTERN = /^#[0-9a-f]{6}$/i;

export const DEFAULT_RENDER_OPTIONS = {
    margin: 4,                  // quiet zone, in modules (the QR spec asks for 4)
    foreground: '#000000',
    background: '#FFFFFF',      // null for a transparent background
    dotType: 'square',          // square | rounded | dots | classy | classy-rounded | extra-rounded
    cornerSquareType: 'square', // square | dot | extra-rounded
    cornerDotType: 'square',    // square | dot
    backgroundRound: 0          // 0–1, fraction of half the side used as the corner radius
};

export class QREncodeError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'QREncodeError';
        this.code = code;
    }
}

// Encode text at exactly the requested error correction level. Text that is
// all digits or all QR-alphanumeric gets the compact numeric/alphanumeric
// mode; everything else is encoded as UTF-8 bytes.
export function encode(text, ecl = 'M') {
    const level = ECC[ecl];
    if (!level) {
        throw new QREncodeError('bad-ecl', `Unknown error correction level: ${ecl}`);
    }

    let segments;
    try {
        segments = QrSegment.makeSegments(text);
    } catch {
        // encodeURI() rejects unpaired UTF-16 surrogates
        throw new QREncodeError('invalid-text', 'Content contains characters that can’t be encoded.');
    }

    try {
        return QrCode.encodeSegments(segments, level, QrCode.MIN_VERSION, QrCode.MAX_VERSION, -1, false);
    } catch (error) {
        if (error instanceof RangeError && error.message === 'Data too long') {
            throw new QREncodeError('too-long', 'Too much content for a QR code at this error correction level.');
        }
        throw error;
    }
}

// Build the drawable geometry for a QR code in module units. The viewBox
// starts at -margin so module (x, y) sits at exactly (x, y).
export function buildGeometry(qr, options = {}) {
    const opts = { ...DEFAULT_RENDER_OPTIONS, ...options };
    const n = qr.size;
    const margin = clampInt(opts.margin, 0, 20, DEFAULT_RENDER_OPTIONS.margin);
    const extent = n + 2 * margin;
    const foreground = COLOR_PATTERN.test(opts.foreground) ? opts.foreground : DEFAULT_RENDER_OPTIONS.foreground;
    const background = opts.background && COLOR_PATTERN.test(opts.background) ? opts.background : null;
    const round = Math.min(Math.max(Number(opts.backgroundRound) || 0, 0), 1);

    // Finder patterns are drawn separately so their shape can be styled.
    const inFinder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
    const isDot = (x, y) => x >= 0 && y >= 0 && x < n && y < n && !inFinder(x, y) && qr.getModule(x, y);

    const allSquare = opts.dotType === 'square' && opts.cornerSquareType === 'square' &&
        opts.cornerDotType === 'square' && (!background || round === 0);

    return {
        origin: -margin,
        extent,
        foreground,
        background: background && {
            color: background,
            path: roundedRectPath(-margin, -margin, extent, round * extent / 2)
        },
        dots: dotsPath(n, isDot, opts.dotType),
        finders: findersPath(n, opts.cornerSquareType, opts.cornerDotType),
        crisp: allSquare
    };
}

// Render a QR code as a standalone SVG document string.
export function renderSVG(qr, options = {}) {
    const g = buildGeometry(qr, options);
    const px = clampInt(options.size, 1, 10000, 300);
    const box = `${g.origin} ${g.origin} ${g.extent} ${g.extent}`;
    const crisp = g.crisp ? ' shape-rendering="crispEdges"' : '';

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" width="${px}" height="${px}"${crisp} role="img" aria-label="QR code">`;
    if (g.background) svg += `<path fill="${g.background.color}" d="${g.background.path}"/>`;
    if (g.dots) svg += `<path fill="${g.foreground}" d="${g.dots}"/>`;
    svg += `<path fill="${g.foreground}" fill-rule="evenodd" d="${g.finders}"/>`;
    return svg + '</svg>';
}

// Paint a QR code onto a square canvas context of `px` pixels. Uses Path2D
// with the same path data as the SVG output.
export function paintCanvas(ctx, qr, options, px) {
    const g = buildGeometry(qr, options);
    const scale = px / g.extent;
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, -g.origin * scale, -g.origin * scale);
    if (g.background) {
        ctx.fillStyle = g.background.color;
        ctx.fill(new Path2D(g.background.path));
    }
    ctx.fillStyle = g.foreground;
    if (g.dots) ctx.fill(new Path2D(g.dots));
    ctx.fill(new Path2D(g.finders), 'evenodd');
    ctx.restore();
}

// ----- Data modules -----------------------------------------------------------

function dotsPath(n, isDot, type) {
    let d = '';

    if (type === 'square' || !DOT_SHAPES.has(type)) {
        // Merge horizontal runs into single rectangles: smaller output, and no
        // anti-aliasing seams between neighbouring modules.
        for (let y = 0; y < n; y++) {
            let x = 0;
            while (x < n) {
                if (!isDot(x, y)) { x++; continue; }
                const start = x;
                while (x < n && isDot(x, y)) x++;
                d += `M${start} ${y}h${x - start}v1h${start - x}z`;
            }
        }
        return d;
    }

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            if (!isDot(x, y)) continue;
            if (type === 'dots') {
                d += circlePath(x + 0.5, y + 0.5, 0.5);
                continue;
            }
            const radii = cornerRadii(type,
                isDot(x, y - 1), isDot(x + 1, y), isDot(x, y + 1), isDot(x - 1, y));
            d += cellPath(x, y, radii);
        }
    }
    return d;
}

const DOT_SHAPES = new Set(['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded']);

// Corner radii [top-left, top-right, bottom-right, bottom-left] for one
// module, given which of its four sides touch another dark module. A corner
// is "exposed" when neither side that meets there has a neighbour.
function cornerRadii(type, top, right, bottom, left) {
    const tl = !top && !left;
    const tr = !top && !right;
    const br = !bottom && !right;
    const bl = !bottom && !left;
    const isolated = !top && !right && !bottom && !left;

    switch (type) {
        case 'rounded':
            return [tl, tr, br, bl].map(exposed => (exposed ? 0.5 : 0));
        case 'extra-rounded':
            // A lone exposed corner becomes a quarter circle; two exposed
            // corners on one side share it as a half circle.
            return [
                tl ? (tr || bl ? 0.5 : 1) : 0,
                tr ? (tl || br ? 0.5 : 1) : 0,
                br ? (tr || bl ? 0.5 : 1) : 0,
                bl ? (br || tl ? 0.5 : 1) : 0
            ];
        case 'classy':
        case 'classy-rounded': {
            // Only the top-left and bottom-right corners round, giving a leaf shape.
            const r = type === 'classy' || isolated ? 0.5 : 1;
            return [tl ? r : 0, 0, br ? r : 0, 0];
        }
        default:
            return [0, 0, 0, 0];
    }
}

// One module cell with per-corner radii, drawn clockwise from the top-left.
function cellPath(x, y, [tl, tr, br, bl]) {
    let d = `M${x + tl} ${y}H${x + 1 - tr}`;
    if (tr) d += `A${tr} ${tr} 0 0 1 ${x + 1} ${y + tr}`;
    d += `V${y + 1 - br}`;
    if (br) d += `A${br} ${br} 0 0 1 ${x + 1 - br} ${y + 1}`;
    d += `H${x + bl}`;
    if (bl) d += `A${bl} ${bl} 0 0 1 ${x} ${y + 1 - bl}`;
    d += `V${y + tl}`;
    if (tl) d += `A${tl} ${tl} 0 0 1 ${x + tl} ${y}`;
    return d + 'z';
}

// ----- Finder patterns ("corner squares" and "corner dots") ------------------

function findersPath(n, squareType, dotType) {
    let d = '';
    for (const [ox, oy] of [[0, 0], [n - 7, 0], [0, n - 7]]) {
        // Outer ring: the 7×7 shape minus the 5×5 hole (filled with evenodd)
        switch (squareType) {
            case 'dot':
                d += circlePath(ox + 3.5, oy + 3.5, 3.5) + circlePath(ox + 3.5, oy + 3.5, 2.5);
                break;
            case 'extra-rounded':
                d += roundedRectPath(ox, oy, 7, 2.5) + roundedRectPath(ox + 1, oy + 1, 5, 1.5);
                break;
            default:
                d += roundedRectPath(ox, oy, 7, 0) + roundedRectPath(ox + 1, oy + 1, 5, 0);
        }
        // Centre 3×3. Inside a round ring, a sharp square's corners come within
        // 0.4 modules of the ring diagonally, which breaks finder detection at
        // low resolution, so its corners are softened slightly there.
        d += dotType === 'dot'
            ? circlePath(ox + 3.5, oy + 3.5, 1.5)
            : roundedRectPath(ox + 2, oy + 2, 3, squareType === 'dot' ? 0.75 : 0);
    }
    return d;
}

// ----- Path helpers ------------------------------------------------------------

function circlePath(cx, cy, r) {
    return `M${num(cx - r)} ${num(cy)}a${num(r)} ${num(r)} 0 1 0 ${num(2 * r)} 0a${num(r)} ${num(r)} 0 1 0 ${num(-2 * r)} 0z`;
}

function roundedRectPath(x, y, side, r) {
    r = Math.min(r, side / 2);
    if (r <= 0) return `M${num(x)} ${num(y)}h${num(side)}v${num(side)}h${num(-side)}z`;
    const s = num(side - 2 * r);
    const a = `a${num(r)} ${num(r)} 0 0 1`;
    return `M${num(x + r)} ${num(y)}h${s}${a} ${num(r)} ${num(r)}v${s}${a} ${num(-r)} ${num(r)}` +
        `h${num(-(side - 2 * r))}${a} ${num(-r)} ${num(-r)}v${num(-(side - 2 * r))}${a} ${num(r)} ${num(-r)}z`;
}

// Short, stable number formatting for path data
function num(value) {
    return String(Math.round(value * 1000) / 1000);
}

function clampInt(value, min, max, fallback) {
    const n = Math.round(Number(value));
    return Number.isFinite(n) ? Math.min(Math.max(n, min), max) : fallback;
}
