// Karma configuration
var paths  = require('../../paths.json');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      // src files
      paths.bower + '/jquery/dist/jquery.min.js',
      paths.bower + '/angular/angular.min.js',
      paths.bower + '/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      paths.bower + '/lodash/lodash.min.js',
      paths.client.root + '/app/app.js',
      paths.client.root + '/app/modules/modules.js',
      paths.client.root + '/app/modules/**/**/*.js',
      paths.client.root + '/app/core/core.js',
      paths.client.root + '/app/core/**/**/*.js',

      // template files
      // paths.client.root + '/app/**/*.html',
      paths.build.html,

      // spec files
      paths.spec.client.integration,
      paths.spec.client.unit,
    ],


    // list of files to exclude
    exclude: [
    ],

    // plugins: ['karma-ng-html2js-preprocessor'],

    preprocessors: {
      /**
       * source files to test coverage for
       * do not include tests or libraries
       * (these files will be instrumented by Istanbul)
       */
      // TODO set source files for coverage
      'src/client/**/*.js': ['coverage'],

      /**
       * Convert template views into Angular modules that can be loaded into
       * $templateCache. See http://stackoverflow.com/questions/15214760/
       * unit-testing-angularjs-directive-with-templateurl
       */
      'build/html/**/*.html': ['ng-html2js']
    },

    // HTML template preprocessor config
    ngHtml2JsPreprocessor: {
      stripPrefix: 'build'//,
      // moduleName: 'my.templates'
    },

    // optionally, configure the coverage reporter
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/client',
      subdir: '.'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    //  Custom launcher for Travis-CI
    customLaunchers: {
      chromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });

  // Custom configuration for Travis-CI
  if(process.env.TRAVIS){
    config.browsers = ['chromeTravisCI'];
  }
};
