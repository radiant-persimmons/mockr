module.exports = function($, gulp, paths){

  /**
   * @name nightwatch
   * @task nightwatch
   * @description Runs Nightwatch tests
   * @return {Stream}
   */
  return function nightwatch() {
    return gulp.src('')
      .pipe($.shell([
        './node_modules/nightwatch/bin/nightwatch --env chrome'
      ]));
  };
};
