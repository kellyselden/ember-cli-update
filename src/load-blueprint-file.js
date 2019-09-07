'use strict';

const fs = require('fs-extra');
const path = require('path');

async function loadBlueprintFile(cwd) {
  try {
    return await fs.readJson(path.join(cwd, 'config/ember-cli-update.json'));
  } catch (err) {}
}

module.exports = loadBlueprintFile;
