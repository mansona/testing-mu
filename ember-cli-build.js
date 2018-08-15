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
    configPath: './dummy/mu/config/environment',
    trees: {
      src: 'dummy/mu/src',
      public: 'dummy/mu/public',
      styles: 'dummy/mu/src/ui/styles',
      templates: 'dummy/mu/src/templates',
      tests: new Funnel('tests', {
        exclude: [/^mu/],
      }),
      vendor: null,
    },
  }));


  let classicApp = new EmberAddon({ project: Project.closestSync(process.cwd()) }, Object.assign({}, sharedOptions, {
    name: 'classic',
    configPath: './dummy/classic/config/environment',
    trees: {
      app: 'dummy/classic/app',
      public: 'dummy/classic/public',
      src: null,
      styles: 'dummy/classic/app/styles',
      templates: 'dummy/classic/app/templates',
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
