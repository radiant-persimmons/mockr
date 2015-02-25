// Karma configuration
var paths  = require('../../paths.json');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      // src files
      // 'client/app/core/controllers/app.controller.js',
      // TODO: set src files

      // spec files
      paths.spec.client,
      paths.client.root + '/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    preprocessors: {
      /**
       * source files to test coverage for
       * do not include tests or libraries
       * (these files will be instrumented by Istanbul)
       */
      // TODO set source files for coverage
      'client/**/*.js': ['coverage']
    },

    // optionally, configure the coverage reporter
    coverageReporter: {
      type : 'lcov',
      dir : '../coverage/client',
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
