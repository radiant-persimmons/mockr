module.exports = function($, gulp, paths){

  /**
   * @name coveralls
   * @task coveralls
   * @note Does not run if not in Travis CI
   * @description Sends `lcov` code coverage data to Coveralls service
   * @return {Stream}
   */
  return function coveralls() {
    if (!process.env.CI) return;

    var source = gulp.src([
      paths.coverage.lcov.client,
      paths.coverage.lcov.server
    ]);

    return source
      .pipe($.concat('lcov.info'))
      .pipe($.coveralls());
  };
};
