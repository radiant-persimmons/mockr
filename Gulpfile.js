;(function() {
  'use strict';

  /*  Dependencies  */
  var lib    = require('./lib')
  var gulp   = require('gulp');
  var $      = require('gulp-load-plugins')({lazy:false});
  var del    = require('del');

  /* Tasks */

var tasks = lib.tasks

//================== DEV
gulp
  .task( 'default',
    $.sequence( 'clean'
              , 'build:dev'
              , 'start:dev'
              ));

// ====== BUILD
gulp
  .task( 'js:dev'    , tasks.js.dev     )
  .task( 'css:dev'   , tasks.css.dev    )
  .task( 'styl:dev'  , tasks.styl.dev   )
  .task( 'html:dev'  , tasks.html.dev   )
  .task( 'jade:dev'  , tasks.jade.dev   )
  .task( 'images:dev', tasks.images.dev )
  .task( 'build:dev' ,
    $.sequence( 'js:dev'
              , 'css:dev'
              , 'styl:dev'
              , 'html:dev'
              , 'jade:dev'
              , 'images:dev'
              ));

// ====== START
gulp
  .task( 'vendor:dev' , tasks.vendor.dev )
  .task( 'inject:dev' , tasks.inject.dev )
  .task( 'server:dev' , tasks.server.dev )
  .task( 'watch:dev'  , tasks.watch.dev  )
  .task( 'start:dev'  ,
    $.sequence(
                'vendor:dev'
              , 'inject:dev'
              , 'server:dev'
              , 'watch:dev'
              ));


// //================== STAGE

// gulp
//   .task('default',
//     $.sequence('clean',
//                'build:stage',
//                'start:stage'));

// // ====== BUILD

// gulp
//   .task('js:stage', tasks.js.stage)
//   .task('css:stage', tasks.css.stage)
//   .task('styl:stage', tasks.styl.stage)
//   .task('html:stage', tasks.html.stage)
//   .task('jade:stage', tasks.jade.stage)
//   .task('images:stage', tasks.images.stage)
//   .task('build:stage',
//     $.sequence('js:stage',
//                'css:stage',
//                'styl:stage',
//                'html:stage',
//                'jade:stage',
//                'images:stage'));

// ======= START


/*  TODO

  BUILD the stage tasks
  There are descriptions on what is needed in order to use build each task within the task file.
  Declare each Task
  The run the declared tasks using $.sequence
  Example

    gulp
      .task('stage',
        $.sequence(  'build:stage'
                     'start:stage'))

    gulp
      .task('js:stage'   , tasks.js.stage   )
      .task('css:stage'  , tasks.css.stage  )
      .task('html:stage' , tasks.html.stage )
      .task('build:stage',
        $.sequence( 'js:stage'
                  , 'css:stage'
                  , 'html:stage'))

    gulp
      .task('stage:stage',
        $.sequence( / LIST TASKS HERE /))

*/


//

//================== CLEAN
gulp
  .task('clean', del.bind(null, ['build']));


/******************************************************************************
 * Testing suite
 *****************************************************************************/

// Run testing suite: lint, karma (client-side) and mocha (server-side)
gulp.task('test', function(callback) {
  /**
   * Use `runSequence` to call tasks synchronously, otherwise
   * messages from both will be potentially interleaved.
   */
  runningTests = true;
  runSequence('lint', 'karma', 'mocha', callback);
});

gulp.task('lint', function() {
  return gulp.src(jsFilesForLint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    // Error out if any warnings appear
    .pipe(jshint.reporter('fail'));
});

gulp.task('karma', function (done) {
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});

/**
 * mocha
 * =====
 * Runs the mocha tests. Because gulp-mocha is stupid, this task must be
 * forcibly exited using `process.exit()`. As such, **no other tasks will
 * successfully be reached after this task.** Do whatever hair-brained
 * workarounds are necessary to not have any tasks be dependent on this one.
 */

var handleMochaError = function (err) {
  console.log('Mocha encountered an error, exiting with status 1');
  console.log('Error:', err.message);
  process.exit(1);
};

gulp.task('mocha', function (cb) {
  var mochaErr;
  // Track src files that should be covered
  gulp.src(serverFiles)
    .pipe(istanbul({ includeUntested: true })) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      // Specify server specs
      gulp.src(paths.serverSpec, {read: false})
        .pipe(plumber())
        .pipe(mocha({
          reporter: 'spec',
          timeout: 20000
        }))
        /**
         * Keep track of latest error on Mocha. Because a failed test counts
         * as an error, the process should not be exited until end of tests.
         */
        .on('error', function(err) {
          /**
           * This intermediate log is useful for when mocha crashes (as opposed
           * to a test failing). Can be commented out if needed.
           */
          console.error('ERROR:', err.message);
          console.error('Stack:', err.stack);
          mochaErr = err;
        })
        // Write reports to Istanbul
        .pipe(istanbul.writeReports())
        /**
         * The methods below are a hack to get gulp to exit after mocha tests
         * finish. Without them, `gulp mocha` doesn't exit and Travis
         * never finishes running the tests.
         */
        .on('end', function () {
          if (mochaErr) return handleMochaError(mochaErr);
          // Force mocha to exit, because gulp-mocha is stupid.
          process.exit();
        });
    });
});

/**
 * coveralls
 * =========
 * Sends code coverage data to Coveralls.
 */
gulp.task('coveralls', tasks.coveralls);


/******************************************************************************
 * Environment configuration
 *****************************************************************************/
/**
 * envConfig, envConfigDevelopment, and envConfigProduction are used to configure builds
 * with the proper environment. Arguments are passed into the preprocess
 * task to insert variables into files. For example, the base href needs
 * to be dynamically set based on the environment.
 *
 * TODO: currently copied from previous project. May not be needed. keep for now
 * and delete later.
 */
// var envConfig;

// var envConfigDevelopment = {
//   BASE_HREF: 'localhost:3000'
// };

// var envConfigProduction = {
//   BASE_HREF: 'pathlete.herokuapp.com'
// };

// gulp.task('processEnv', function() {
//   gulp.src('./server/views/index_template.ejs')
//     .pipe(preprocess({context: envConfig}))
//     .pipe(concat('index.ejs'))
//     .pipe(gulp.dest('./server/views'));
// });

})();
