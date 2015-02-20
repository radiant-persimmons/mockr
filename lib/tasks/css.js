module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            css:dev
     * @description     Create a stream from the ./src/client/app directory for all .css files
     *                  Concatinate all .css files && rename the concatinated file to app.css
     *                  Pipe the .css files into ./build/css
     * @return {Stream}
     */
    dev: function(){
      var source = gulp.src(paths.client.css);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.concat('app.css'))
        .pipe( dest )
        .pipe($.livereload());
    },
    /**
     * @name            stage
     * @task            css:stage
     * @description     Create a stream from the ./src/client/ directory for all .css files
     *                  Concatinate the .css files && rename it to app.min.css
     *                  Minify the concatinated css file
     *                  Pipe the app.min.css file into ./build/css
     * @return {Stream}
     */
    stage: function(){
      var source = gulp.src(paths.client.css);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.concat('app.min.css'))
        .pipe($.minifyCss())
        .pipe(dest)
        .pipe($.livereload());
    }
  };
};
