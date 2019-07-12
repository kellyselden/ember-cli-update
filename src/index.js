'use strict';

const getProjectOptions = require('./get-project-options');
const getPackageName = require('./get-package-name');
const getPackageVersion = require('./get-package-version');
const getVersions = require('boilerplate-update/src/get-versions');
const getProjectVersion = require('./get-project-version');
const _getTagVersion = require('./get-tag-version');
const getRemoteUrl = require('./get-remote-url');
const boilerplateUpdate = require('boilerplate-update');
const getStartAndEndCommands = require('./get-start-and-end-commands');

module.exports = async function emberCliUpdate({
  from,
  to,
  resolveConflicts,
  runCodemods,
  reset,
  compareOnly,
  statsOnly,
  listCodemods,
  createCustomDiff,
  wasRunAsExecutable
}) {
  return await (await boilerplateUpdate({
    projectOptions: ({ packageJson }) => getProjectOptions(packageJson),
    mergeOptions: async function mergeOptions({
      packageJson,
      projectOptions
    }) {
      let packageName = getPackageName(projectOptions);
      let packageVersion = getPackageVersion(packageJson, packageName);
      let versions = await getVersions(packageName);
      let getTagVersion = _getTagVersion(versions, packageName);

      let startVersion;
      if (from) {
        startVersion = await getTagVersion(from);
      } else {
        startVersion = getProjectVersion(packageVersion, versions, projectOptions);
      }

      let endVersion = await getTagVersion(to);

      return {
        startVersion,
        endVersion
      };
    },
    remoteUrl: ({ projectOptions }) => getRemoteUrl(projectOptions),
    compareOnly,
    resolveConflicts,
    reset,
    statsOnly,
    listCodemods,
    runCodemods,
    codemodsUrl: 'https://raw.githubusercontent.com/NullVoxPopuli/ember-cli-update-codemods-manifest/patch-1/manifest.json',
    createCustomDiff,
    customDiffOptions: getStartAndEndCommands,
    wasRunAsExecutable
  })).promise;
};
