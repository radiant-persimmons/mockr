var bower = require('main-bower-files');

module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            vendor:dev
     * @description     Create a stream from the ./lib/bower_components using gulp-bower
     *                  Pipe all bower components into ./build/vendor
     * @return {Stream}
     */
    dev: function(){

      return $.bower()
        .pipe(gulp.dest(paths.build.dir.vendor))
    },
    /**
     * @name            dev
     * @task            vendor:dev
     * @description     Create a stream from the ./lib/bower_components using gulp-bower
     *                  Concatinate all bower files into one single file & rename the file to vendor.min.js && vendor.min.css
     *                  Pipe all bower components into ./build/vendor
     * @return {Stream}
     */
    stage: function(){

      /**
       * Non-Bower vendor files or Bower non css/js files
       */

      // Grab the Bootstrap icon files
      gulp.src(paths.bower + '/bootstrap/fonts/**/*')
        .pipe(gulp.dest(paths.build.root + '/fonts/'));

      // Grab zeroclipboard file
      gulp.src(paths.bower + '/zeroclipboard/dist/ZeroClipboard.swf')
        .pipe(gulp.dest(paths.build.dir.vendor));

      /**
       * Standard Bower JS and CSS vendor files
       */

      // Grab only the necessary vendor files using main-bower-files
      var src  = gulp.src(bower({paths:{bowerDirectory: paths.bower}}))
      var dest = gulp.dest(paths.build.dir.vendor);

      // Create filters for processing files
      var jsFilter = $.filter('**/*.js');
      var cssFilter = $.filter('**/*.css');
      var jsAndCssFilter = $.filter(['**/*.js', '**/*.css']);

      return src
        // filter for JS files to concat and minify
        .pipe(jsFilter)
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe(jsFilter.restore())

        // filter for CSS files to concat and minify
        .pipe(cssFilter)
        .pipe($.concat('vendor.min.css'))
        .pipe($.minifyCss())
        .pipe(cssFilter.restore())

        // filter for JS and CSS files to pipe to dest
        .pipe(jsAndCssFilter)
        .pipe(dest);
    }
  };
};
