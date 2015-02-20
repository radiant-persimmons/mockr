module.exports = function($, gulp, paths){

  return {
    dev: function(){
      $.livereload();
      $.livereload.listen();
      gulp.watch(paths.client.jade,     ['jade:dev'   ]);
      gulp.watch(paths.client.js,       ['js:dev'     ]);
      gulp.watch(paths.client.css,      ['css:dev'    ]);
      gulp.watch(paths.client.index,    ['inject:dev' ]);
      gulp.watch(paths.client.styl.all, ['styl:dev'   ]);
      // gulp.watch(paths.client.jade,     ['jade:dev'   , $.livereload.reload]);
      // gulp.watch(paths.client.js,       ['js:dev'     , $.livereload.reload]);
      // gulp.watch(paths.client.css,      ['css:dev'    , $.livereload.reload]);
      // gulp.watch(paths.client.index,    ['inject:dev' , $.livereload.reload]);
      // gulp.watch(paths.client.styl.all, ['styl:dev'   , $.livereload.reload]);
    },

    /**
     * @name stage
     * @task server:stage
     * @description Watches all directories for changes, runs tasks as needed.
     *              Server files are not watched here; that is done by
     *              gulp-nodemon.
     */
    stage: function(){
      $.livereload();
      $.livereload.listen();
      gulp.watch(paths.client.jade,     ['jade:stage'  ]);
      gulp.watch(paths.client.js,       ['js:stage'    ]);
      gulp.watch(paths.client.css,      ['css:stage'   ]);
      gulp.watch(paths.client.index,    ['inject:stage']);
      gulp.watch(paths.client.styl.all, ['styl:stage'  ]);
      // gulp.watch(paths.client.jade,     ['jade:stage'   , $.livereload.reload]);
      // gulp.watch(paths.client.js,       ['js:stage'     , $.livereload.reload]);
      // gulp.watch(paths.client.css,      ['css:stage'    , $.livereload.reload]);
      // gulp.watch(paths.client.index,    ['inject:stage' , $.livereload.reload]);
      // gulp.watch(paths.client.styl.all, ['styl:stage'   , $.livereload.reload]);
    }
  };
};
//
