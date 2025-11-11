module.exports = function (eleventyConfig) {
  // Enable showing network IPs for remote access
  eleventyConfig.setServerOptions({
    showAllHosts: true,  // Displays LAN IPs in console for remote testing
    port: 8080
  });

  // Copy CSS, JS, manifest, and icons to output
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/manifest.json');
  eleventyConfig.addPassthroughCopy('src/icons'); // If you add icons here later

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_includes'
    },
    pathPrefix: '/', // Ensures root-relative URLs, great for custom domain hosting
    templateFormats: ['md', 'html', 'liquid'],
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid'
  };
};