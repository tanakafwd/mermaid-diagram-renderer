module.exports = {
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
  maxConcurrency: 1,
  maxWorkers: 1,
};
