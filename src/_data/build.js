const { execSync } = require('child_process');

module.exports = function() {
  let gitHash = 'dev';
  let gitDate = new Date().toISOString();
  let buildTime = new Date().toISOString();

  try {
    // Get short git commit hash (7 characters)
    gitHash = execSync('git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim();

    // Get commit date
    gitDate = execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim();
  } catch (error) {
    // Not in a git repository or git not available
    // Use 'dev' and current timestamp for local development
    console.log('Git info not available, using development build info');
  }

  return {
    hash: gitHash,
    version: gitHash, // Alias for convenience
    commitDate: gitDate,
    buildTime: buildTime,
    year: new Date().getFullYear()
  };
};
