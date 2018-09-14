'use strict';

const Project = require('ember-cli/lib/models/project');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const mergeTrees = require('broccoli-merge-trees');

module.exports = function() {
  let sharedOptions = {
    /*
      Leave jQuery out of this addon's own test suite & dummy app by default,
      so that the addon can be used in apps without jQuery. If you really need
      jQuery, it's safe to remove this line.
    */
    vendorFiles: { 'jquery.js': null, 'app-shims.js': null },
    outputPaths: {
      app: {
        css: {
          app: `/assets/app.css`,
        },
        js: `/assets/app.js`,
      },
    },
    // Add options here
  };

  let project = Project.closestSync(__dirname);

  // TODO fix me
  project._targets = require('./config/targets');

  let muApp = new EmberAddon({ project }, Object.assign({}, sharedOptions, {
    name: 'mu',
    configPath: './packages/mu/config/environment',
    trees: {
      src: 'packages/mu/src',
      public: 'packages/mu/public',
      styles: 'packages/mu/src/ui/styles',
      templates: 'packages/mu/src/templates',
      tests: mergeTrees(['tests', 'packages/mu/tests'], { overwrite: true }),
      vendor: null,
    },
  }));

  // let dummyApp = new EmberAddon({ project: Project.closestSync(process.cwd()) }, sharedOptions);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

   return muApp.toTree();
};
