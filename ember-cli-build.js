'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = function(defaults) {
  const dummyDirectory = join(process.cwd(), 'dummy');

  const dummyAppFolders = readdirSync(dummyDirectory);

  const dummyAppTrees = dummyAppFolders.map((name) => {
    let app = require(join(process.cwd(), 'dummy', name, 'ember-cli-build.js'))(defaults);
    return new Funnel(app, { destDir: name});
  });

  return MergeTrees(dummyAppTrees);
};
