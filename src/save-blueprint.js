'use strict';

const utils = require('./utils');

async function saveBlueprint({
  cwd,
  name,
  type,
  location,
  version,
  options = [],
  isBaseBlueprint
}) {
  let emberCliUpdateJson = await utils.loadSafeBlueprintFile(cwd);

  let { blueprints } = emberCliUpdateJson;
  let savedBlueprint = blueprints.find(b => b.name === name);

  if (!savedBlueprint) {
    savedBlueprint = {
      name
    };

    if (type) {
      savedBlueprint.type = type;
    }

    if (location) {
      savedBlueprint.location = location;
    }

    savedBlueprint.version = version;

    if (isBaseBlueprint !== undefined) {
      savedBlueprint.isBaseBlueprint = isBaseBlueprint;
    }

    if (options.length) {
      savedBlueprint.options = options;
    }

    blueprints.push(savedBlueprint);
  } else {
    savedBlueprint.version = version;
  }

  await utils.saveBlueprintFile(cwd, emberCliUpdateJson);
}

module.exports = saveBlueprint;
