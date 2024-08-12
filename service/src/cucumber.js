require('ts-node/register'); 

const common = [
  'service/src/features/**/*.feature', // Adjust path pattern for feature files
  '--require-module ts-node/register', // Register ts-node to handle TypeScript
  '--require src/features/stepDefinitions/**/*.ts', // Path to your step definitions
  '--format progress-bar', // Output format
  `--format-options '{"snippetInterface": "synchronous"}'` // Snippet options
].join(' ');

module.exports = {
  default: common
};

