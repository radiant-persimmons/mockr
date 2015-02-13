var stylish = require('jshint-stylish');

module.exports = function($, gulp, paths){

  /**
   * @name lint
   * @task lint
   * @note Uses `.jshintrc` for settings
   * @description Checks JS files for style errors
   * @return {Stream}
   */
  return function lint() {
    var src = gulp.src([
      paths.server.js,
      paths.client.js
    ]);

    return src
      .pipe($.jshint())
      .pipe($.jshint.reporter(stylish))
      .pipe($.jshint.reporter('fail'));
  }
};
