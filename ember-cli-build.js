'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

const { dummyAppTrees } = require('ember-cli-multiple-dummy-apps');

module.exports = function(defaults) {
  return dummyAppTrees(EmberAddon, defaults, {
    // Add options here
  });
};
