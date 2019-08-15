'use strict';

module.exports = {
  description: 'ember-cli-update-git-blueprint-test',

  locals(options) {
    let name = options.entity.name;
    let blueprintVersion = require('./package').version;

    return {
      name,
      blueprintVersion
    };
  }
};