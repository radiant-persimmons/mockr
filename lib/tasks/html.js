module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            html:dev
     * @note            DO NOT INCLUDE ./src/client/index.html
     * @description     Create a stream from the ./src/client/app directory for all .html files
     *                  Pipe the .html files into ./build/html
     * @return {Stream}
     */
    dev: function(){
      var source = gulp.src(paths.client.html);
      var dest   = gulp.dest(paths.build.dir.html);

      return source
        .pipe( dest )
        .pipe($.livereload());
    },
    /**
     * @name            stage
     * @task            html:stage
     * @note            DO NOT INCLUDE ./src/client/index.html
     *                  TODO: figure out what html:stage should do
     * @description     Create a stream from the ./src/client/app directory for all .html files
     *                  Pipe the templates through gulp-angularTemplatecache to turn them into angular templates
     *                  Concatinate the template.js files
     *                  Minify the Template Files
     *                  Pipe the minified templates file into ./build/html
     * @return {Stream}
     */
    stage: function(){
      var source = gulp.src(paths.client.html);
      var dest = gulp.dest(paths.build.dir.html);

      return source
        .pipe(dest)
        .pipe($.livereload());
    }
  };
};
