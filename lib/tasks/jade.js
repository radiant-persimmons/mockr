module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            jade:dev
     * @description     Create a stream from the ./src/client/ directory for all .jade files
     *                  Pipe the .jade files through gulp-plumber to keep the command-line from shutting down due to errors
     *                  Compile .jade files into .html files using gulp-jade
     *                  Stop gulp-plumber
     *                  Pipe the new .html files into ./build/html
     * @return {Stream}
     */
    dev: function(){
      var source = gulp.src(paths.client.jade);
      var dest   = gulp.dest(paths.build.dir.html);

      return source
        .pipe($.plumber())
        .pipe($.jade())
        .pipe($.plumber.stop())
        .pipe( dest )
        .pipe($.livereload());
    },
    /**
     * @name            stage
     * @task            jade:stage
     *                  TODO: figure out what to do here
     * @description     Create a stream from the ./src/client/ directory for all .jade files
     *                  Compile .jade files into .html files using gulp-jade
     *                  Pipe the templates through gulp-angularTemplatecache to turn them into angular templates
     *                  Concatinate the template.js files
     *                  Minify the Template Files
     *                  Pipe the compiled templates file into ./build/html
     * @return {Stream}
     */
    stage: function(){
      var source = gulp.src(paths.client.jade);
      var dest = gulp.dest(paths.build.dir.html);

      return source
        .pipe($.jade())
        .pipe(dest)
        .pipe($.livereload());
    }
  };
};
