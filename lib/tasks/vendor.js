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

      var jsFilter = $.filter('**/*.js');
      var cssFilter = $.filter('**/*.css');
      var jsAndCssFilter = $.filter(['**/*.js', '**/*.css']);
      var dest = gulp.dest(paths.build.dir.vendor);

      $.bower()
        .pipe(jsFilter)
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.concat('vendor.min.css'))
        .pipe($.minifyCss())
        .pipe(cssFilter.restore())
        .pipe(jsAndCssFilter)
        .pipe(dest);

      // var jsFilter = $.filter('**/*.js');
      // var cssFilter = $.filter('**/*.css');
      // // var jsAndCssFilter = $.filter(['**/*.js', '**/*.css']);
      // var source = $.bower();
      // var dest = gulp.dest(paths.build.dir.vendor);

      // // $.bower()
      // source
      //   .pipe(jsFilter)
      //   .pipe($.concat('vendor.min.js'))
      //   // .pipe($.uglify())
      //   .pipe(dest)
      //   .pipe(jsFilter.restore())

      // source
      //   .pipe($.filter('**/*.css'))
      //   .pipe($.concat('vendor.min.css'))
      //   // // .pipe($.minifyCss({ keepBreaks: true }))
      //   .pipe(dest);
      //   // .pipe(cssFilter.restore())
      //   // .pipe(jsAndCssFilter);


    }
  };
};
