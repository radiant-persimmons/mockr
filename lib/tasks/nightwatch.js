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
        'node src/server/index.js & sleep 5 && ./node_modules/nightwatch/bin/nightwatch && echo "done"'
      ]));
  };
};
