'use strict';

const Project = require('ember-cli/lib/models/project');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

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

  let muApp = new EmberAddon({ project: Project.closestSync(process.cwd()) }, Object.assign({}, sharedOptions, {
    name: 'mu',
    configPath: './tests/mu/config/environment',
    trees: {
      app: 'tests/mu/app',
      public: 'tests/mu/public',
      src: null,
      styles: 'tests/mu/app/styles',
      templates: 'tests/mu/app/templates',
      tests: new Funnel('tests', {
        exclude: [/^mu/],
      }),
      vendor: null,
    },

  }));
  let classicApp = new EmberAddon({ project: Project.closestSync(process.cwd()) }, Object.assign({}, sharedOptions, {
    name: 'classic',
    configPath: './tests/classic/config/environment',
    trees: {
      app: 'tests/classic/app',
      public: 'tests/classic/public',
      src: null,
      styles: 'tests/classic/app/styles',
      templates: 'tests/classic/app/templates',
      tests: new Funnel('tests', {
        exclude: [/^classic/],
      }),
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



   return new MergeTrees([
     new Funnel(classicApp.toTree(), { destDir: 'classic'}),
     new Funnel(muApp.toTree(), { destDir: 'mu'})
   ]);
};
