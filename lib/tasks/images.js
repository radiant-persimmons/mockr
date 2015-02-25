module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            images:dev
     * @description     Create a stream from the ./src/client/images directory for all files
     *                  Compress images with optimization level 3 (for more info checkout https://www.npmjs.com/package/gulp-imagemin)
     *                  Pipe the images files into ./build/images
     * @return {Stream}
     */
    dev: function(){
      var source = gulp.src(paths.client.images);
      var dest   = gulp.dest(paths.build.dir.images);

      return source
        .pipe($.imagemin({ optimizationLevel:3 }))
        .pipe( dest );
    },
    /**
     * @name            stage
     * @task            images:stage
     * @description     Create a stream from the ./src/client/images directory for all files
     *                  Compress images with optimization level 3 (for more info checkout https://www.npmjs.com/package/gulp-imagemin)
     *                  Pipe the images files into ./build/images
     * @return {Stream}
     */
    stage: function(){
      var source = gulp.src(paths.client.images);
      var dest   = gulp.dest(paths.build.dir.images);

      return source
        .pipe($.imagemin({ optimizationLevel:3 }))
        .pipe( dest );
    }
  };
};
