;(function() {
  'use strict';

  /*  Dependencies  */
  var lib    = require('./lib')
  var gulp   = require('gulp');
  var $      = require('gulp-load-plugins')({lazy:true});
  var del    = require('del');

  /* Tasks */

var tasks = lib.tasks

// ================= DEFAULT

gulp
  .task('default', $.sequence('dev'));

//================== DEV
gulp
  .task( 'dev',
    $.sequence( 'clean'
              , 'build:dev'
              , 'start:dev'
              ));

// ====== BUILD
gulp
  .task( 'js:dev'    , tasks.js.dev     )
  .task( 'css:dev'   , tasks.css.dev    )
  .task( 'styl:dev'  , tasks.styl.dev   )
  .task( 'html:dev'  , tasks.html.dev   )
  .task( 'jade:dev'  , tasks.jade.dev   )
  .task( 'images:dev', tasks.images.dev )
  .task( 'build:dev' ,
    $.sequence( 'js:dev'
              , 'css:dev'
              , 'styl:dev'
              , 'html:dev'
              , 'jade:dev'
              , 'images:dev'
              ));

// ====== START
gulp
  .task( 'vendor:dev' , tasks.vendor.dev )
  .task( 'inject:dev' , tasks.inject.dev )
  .task( 'server:dev' , tasks.server.dev )
  .task( 'watch:dev'  , tasks.watch.dev  )
  .task( 'start:dev'  ,
    $.sequence(
                'vendor:dev'
              , 'inject:dev'
              , 'server:dev'
              , 'watch:dev'
              ));


// //================== STAGE

gulp
  .task('stage',
    $.sequence('clean',
               'build:stage',
               'start:stage'));

// ====== BUILD

gulp
  .task('js:stage', tasks.js.stage)
  .task('css:stage', tasks.css.stage)
  .task('styl:stage', tasks.styl.stage)
  .task('html:stage', tasks.html.stage)
  .task('jade:stage', tasks.jade.stage)
  .task('images:stage', tasks.images.stage)
  .task('build:stage',
    $.sequence('js:stage',
               'css:stage',
               'styl:stage',
               'html:stage',
               'jade:stage',
               'images:stage'));




// ====== START

gulp
  .task('vendor:stage', tasks.vendor.stage)
  .task('inject:stage', tasks.inject.stage)
  .task('server:stage', tasks.server.stage)
  .task('watch:stage', tasks.watch.stage)
  .task('start:stage',
    $.sequence(
      'vendor:stage',
      'inject:stage',
      'server:stage',
      'watch:stage'
    ));


//================== PROD

gulp
  .task('prod',
    $.sequence(
      'clean',
      'build:stage',
      'vendor:stage',
      'inject:stage'
    )
  );

//================== DEPLOY

gulp
  .task('deploy', function() {
    if (process.env.NODE_ENV === 'production') gulp.start('prod');
  });


//================== CLEAN
gulp
  .task('clean', del.bind(null, ['build']));

/******************************************************************************
 * GitHub commands
 *****************************************************************************/

gulp
  .task('git:rebase', tasks.git.rebase)
  .task('git:push', tasks.git.push)
  .task('git:pr', $.sequence('git:rebase', 'git:push'));

/******************************************************************************
 * Testing suite
 *****************************************************************************/

gulp
  .task('lint', tasks.lint)
  .task('karma', tasks.karma)
  .task('mocha', tasks.mocha)
  .task('test',
    $.sequence('lint',
               'karma',
               'mocha')
  );

/**
 * coveralls
 * =========
 * Sends code coverage data to Coveralls.
 */
gulp.task('coveralls', tasks.coveralls);

})();
