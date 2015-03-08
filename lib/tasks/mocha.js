
module.exports = function($, gulp, paths){

  var handleMochaError = function (err) {
    console.log('Mocha encountered an error, exiting with status 1');
    console.log('Error:', err.message);
    process.exit(1);
  };

  /**
   * @name mocha
   * @task mocha
   * @description Runs server-side tests
   * @note Because gulp-mocha can hang on exit after accessing a database,
   *       it forcibly exits using Node's `process.exit()`. Passes along
   *       whether error occurred. **No other tasks will
   *       successfully be reached after this task.**
   * @return {Stream}
   */
  var mochaErr;

  return function() {
    // Track src files that should be covered
    gulp.src(paths.server.js)
      .pipe($.istanbul({ includeUntested: true })) // Covering files
      .pipe($.istanbul.hookRequire()) // Force `require` to return covered files
      .on('finish', function() {
        // Specify server specs
        gulp.src([paths.spec.server.unit, paths.spec.server.integration],
                 {read: false})
          .pipe($.plumber())
          .pipe($.mocha({
            reporter: 'spec',
            timeout: 2000
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
          .pipe($.istanbul.writeReports())
          /**
           * The methods below are a hack to get gulp to exit after mocha tests
           * finish. Without them, `gulp mocha` doesn't exit and Travis
           * never finishes running the tests.
           */
          .on('end', function () {
            // If error occurred, pass along to error handling
            if (mochaErr) return handleMochaError(mochaErr);
            // Force mocha to exit
            process.exit();
          });
      });
  };



};
