'use strict';

const Project = require('ember-cli/lib/models/project');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

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

  let classicApp = new EmberApp({ project: Project.closestSync(__dirname) }, Object.assign({}, sharedOptions, {
    name: 'classic',
    trees: {
      src: null,
      tests: mergeTrees([path.resolve(__dirname, '../../tests'), `${__dirname}/tests`], { overwrite: true }),
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



   return classicApp.toTree();
};
