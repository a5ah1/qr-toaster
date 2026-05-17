const fs = require("fs");
const path = require("path");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

// Build-time cache so each icon is read from disk at most once.
const lucideCache = {};

function lucideIcon(name, size = 20, stroke = 1.75, klass = "") {
  if (typeof name !== "string" || !name.match(/^[a-z0-9-]+$/)) {
    console.warn(`[lucide] invalid icon name: ${name}`);
    return "";
  }
  let svg = lucideCache[name];
  if (svg === undefined) {
    const file = path.join(__dirname, "node_modules/lucide-static/icons", `${name}.svg`);
    try {
      svg = fs.readFileSync(file, "utf8");
    } catch {
      console.warn(`[lucide] icon not found: ${name}`);
      svg = "";
    }
    lucideCache[name] = svg;
  }
  if (!svg) return "";
  // Strip leading license comment, patch sizing/stroke, add aria-hidden.
  return svg
    .replace(/^<!--[\s\S]*?-->\s*/, "")
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`)
    .replace(/stroke-width="[\d.]+"/, `stroke-width="${stroke}"`)
    .replace(/<svg\b/, `<svg aria-hidden="true"`)
    .replace(/class="([^"]*)"/, (_, c) => `class="${c}${klass ? " " + klass : ""}"`);
}

module.exports = function (eleventyConfig) {
  // {% lucide "name" %} — inline a Lucide SVG at build time.
  // Optional positional args: size (px), stroke-width, extra CSS class.
  eleventyConfig.addShortcode("lucide", lucideIcon);

  // Configure sitemap plugin
  eleventyConfig.addPlugin(sitemap, {
    hostname: "https://a5ah1.github.io/qr-toaster",
  });

  // Enable showing network IPs for remote access
  eleventyConfig.setServerOptions({
    showAllHosts: true,  // Displays LAN IPs in console for remote testing
    port: 8080
  });

  // Copy CSS, JS, manifest, robots.txt, OG image, favicons, and icons to output
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/manifest.json');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/qr-toaster-og.jpeg');
  eleventyConfig.addPassthroughCopy('src/qr-toaster-mark-56.png');
  // Favicon files
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/favicon-96x96.png');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/web-app-manifest-192x192.png');
  eleventyConfig.addPassthroughCopy('src/web-app-manifest-512x512.png');
  eleventyConfig.addPassthroughCopy('src/icons'); // If you add icons here later

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_includes'
    },
    pathPrefix: '/qr-toaster/', // GitHub Pages repository subpath
    templateFormats: ['md', 'html', 'liquid', 'njk'],
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid'
  };
};