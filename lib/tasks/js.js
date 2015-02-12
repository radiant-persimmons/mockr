module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            js:dev
     * @description     Create a stream from the ./src/client/app directory for all .js files
     *                  Pipe the .js files into ./build/js
     * @return {Stream}
     */
    dev: function(){
      var source = gulp.src(paths.client.js);
      var dest   = gulp.dest(paths.build.dir.js);

      return source
        .pipe( dest );
    },
    /**
     * @name            stage
     * @task            js:stage
     * @description     Create a stream from the ./src/client/app directory for all .js files
     *                  Concatinate the .js files && rename it to app.min.js
     *                  Minify the concatinated js file
     *                  Pipe the app.min.js file into ./build/js
     * @return {Stream}
     */
    stage: function(){}
  };
};