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
    console.warn('\n⚠️  WARNING: Git not available - cache-busting will use "dev" instead of commit hash');
    console.warn('   Assets may be cached incorrectly in production. Ensure git is installed and this is a git repository.\n');
  }

  return {
    hash: gitHash,
    version: gitHash, // Alias for convenience
    commitDate: gitDate,
    buildTime: buildTime,
    year: new Date().getFullYear()
  };
};
