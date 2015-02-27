module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            js:dev
     * @description     Create a stream from the ./src/client/app directory for all .js files
     *                  Apply ng-annotate
     *                  Pipe the .js files into ./build/js
     * @return {Stream}
     */
    dev: function(){
      var source = gulp.src(paths.client.js);
      var dest   = gulp.dest(paths.build.dir.js);

      return source
        .pipe($.ignore.exclude('*.spec.js'))
        .pipe($.ngAnnotate({
          /**
           * true helps add where @ngInject is not used. It infers.
           * Doesn't work with resolve, so we must be explicit there
           */
          add: true
        }))
        .pipe( dest )
        .pipe($.livereload());
    },
    /**
     * @name            stage
     * @task            js:stage
     * @description     Create a stream from the ./src/client/app directory for all .js files
     *                  Concatinate the .js files && rename it to app.min.js
     *                  Apply ng-annotate
     *                  Minify the concatinated js file
     *                  Pipe the app.min.js file into ./build/js
     * @return {Stream}
     */
    stage: function(){
      var source = gulp.src(paths.client.js);
      var dest = gulp.dest(paths.build.dir.js);

      return source
        .pipe($.ignore.exclude('*.spec.js'))
        .pipe($.concat('app.min.js'))
        .pipe($.ngAnnotate({
          /**
           * true helps add where @ngInject is not used. It infers.
           * Doesn't work with resolve, so we must be explicit there
           */
          add: true
        }))
        .pipe($.uglify())
        .pipe(dest)
        .pipe($.livereload());
    }
  };
};
