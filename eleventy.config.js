const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
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