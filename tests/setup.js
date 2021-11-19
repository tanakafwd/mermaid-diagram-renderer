'use strict';

// Based on https://jestjs.io/docs/puppeteer

const {mkdir, writeFile} = require('fs').promises;
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const workingDir = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const pathToExtension = require('path').join(__dirname, '../extension');

module.exports = async function() {
  const browser = await puppeteer.launch({
    // As of puppeteer@11.0.0, extensions only work in non-headless mode.
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });
  global.__BROWSER_GLOBAL__ = browser;

  await mkdir(workingDir, {recursive: true});
  await writeFile(path.join(workingDir, 'wsEndpoint'), browser.wsEndpoint());
};
