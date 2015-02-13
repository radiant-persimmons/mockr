var bower = require('main-bower-files');

module.exports = function($, gulp, paths){

  return {
    /**
     * @name            dev
     * @task            inject:dev
     * @description     Create a stream from the ./src/build/js directory for all .js files
     *                  Create a stream from the ./src/build/css directory for all .css files
     *                  Create a stream from the ./src/build/html directory for all .js template files
     *                  Create a stream from the ./lib/bower_components directory for all bower_component files
     *                  Create a stream from the ./src/client/index.html
     *                  Inject all .js files into the index.html between the <!-- app:js --> comment
     *                  Inject all .css files into the index.html between the <!-- app:css --> comment
     *                  Inject all vendor files into the index.html between the <!-- vendor:css && vendor:js --> comments
     *                  Inject all template files into the index.html between the <!-- templates:js --> comment
     *                  Pipe the index.html into the ./build/ directory
     * @return {Stream}
     */
    dev: function(){
      var js        = gulp.src(paths.build.js   , {read:false})
      var css       = gulp.src(paths.build.css  , {read:false})
      var templates = gulp.src(paths.build.html , {read:false})
      var vendor    = gulp.src(bower({paths:{bowerDirectory: paths.build.dir.vendor}}))

      var target    = gulp.src(paths.client.index)
      var dest      = gulp.dest(paths.build.root)

      return target
        .pipe($.inject(js       , {name:'app'   , ignorePath:'build'}))
        .pipe($.inject(css      , {name:'app'   , ignorePath:'build'}))
        .pipe($.inject(vendor   , {name:'vendor', ignorePath:'build'}))
        .pipe($.inject(templates, {name:'templates'}))
        .pipe( dest )
    },
    /**
     * @name            stage
     * @task            inject:stage
     * @description     Create a stream from the ./src/build/js directory for all .js files
     *                  Create a stream from the ./src/build/css directory for all .css files
     *                  Create a stream from the ./src/build/html directory for all .js template files
     *                  Create a stream from the ./lib/bower_components directory for all bower_component files
     *                  Create a stream from the ./src/client/index.html
     *                  Inject all .js files into the index.html between the <!-- app:js --> comment
     *                  Inject all .css files into the index.html between the <!-- app:css --> comment
     *                  Inject all vendor files into the index.html between the <!-- vendor:css && vendor:js --> comments
     *                  Inject all template files into the index.html between the <!-- templates:js --> comment
     *                  Pipe the index.html into the ./build/ directory
     * @return {Stream}
     */
    stage: function(){
      var js        = gulp.src(paths.build.js   , {read:false})
      var css       = gulp.src(paths.build.css  , {read:false})
      var templates = gulp.src(paths.build.html , {read:false})
      var vendor    = gulp.src(bower({paths:{bowerDirectory: paths.build.dir.vendor}}))

      var target    = gulp.src(paths.client.index)
      var dest      = gulp.dest(paths.build.root)

      return target
        .pipe($.inject(js       , {name:'app'   , ignorePath:'build'}))
        .pipe($.inject(css      , {name:'app'   , ignorePath:'build'}))
        .pipe($.inject(vendor   , {name:'vendor', ignorePath:'build'}))
        .pipe($.inject(templates, {name:'templates'}))
        .pipe( dest )
    }
  };
};
