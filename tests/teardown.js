'use strict';

// Based on https://jestjs.io/docs/puppeteer

const fs = require('fs').promises;
const os = require('os');
const path = require('path');
const workingDir = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  await global.__BROWSER_GLOBAL__.close();
  await fs.rm(workingDir, {recursive: true, force: true});
};
