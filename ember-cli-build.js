'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    /*
      Leave jQuery out of this addon's own test suite & dummy app by default,
      so that the addon can be used in apps without jQuery. If you really need
      jQuery, it's safe to remove this line.
    */
    vendorFiles: { 'jquery.js': null, 'app-shims.js': null }

    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

   let otherApp = new EmberAddon(defaults, { baseDir: 'test/mu' });


   return new MergeTrees([new Funnel(app, { destDir: 'dummy'}), new Funnel(otherApp, { destDir: 'mu'})]);
};
