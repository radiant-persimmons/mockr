module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            styl:dev
     * @note            the index.styl file should import the remainder of the stylus files
     * @description     Create a stream from the ./src/client/app/index.styl file
     *                  Pipe the .styl file through gulp-plumber to keep the command-line from shutting down due to errors
     *                  Compile the .styl file into a .css file
     *                  Run gulp-autoprefixer which prefixes any css properties requiring -webkit- and -moz- -mz- -o-
     *                  Rename the file to stylus.css
     *                  Stop gulp-plumber
     *                  Pipe the file into ./build/css
     * @return {Stream}
     */
    dev: function(){
      var source = gulp.src(paths.client.styl.index);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.autoprefixer())
        .pipe($.rename('stylus.css'))
        .pipe($.plumber.stop())
        .pipe( dest )
        .pipe($.livereload());
    },
    /**
     * @name            stage
     * @task            styl:stage
     * @note            the index.styl file should import the remainder of the stylus files
     * @description     Create a stream from the ./src/client/app/index.styl file
     *                  Compile the .styl file into a .css files
     *                  Run gulp-autoprefixer which prefixes any css properties requiring -webkit- and -moz- -mz- -o-
     *                  Rename the file to stylus.min.css
     *                  Pipe the file into ./build/css
     * @return {Stream}
     */
    stage: function(){
      var source = gulp.src(paths.client.styl.index);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.autoprefixer())
        .pipe($.rename('stylus.min.css'))
        .pipe($.minifyCss())
        .pipe($.plumber.stop())
        .pipe(dest)
        .pipe($.livereload());
    }
  };
};
