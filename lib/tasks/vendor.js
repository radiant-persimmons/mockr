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
    stage: function(){}
  };
};