;(function() {
  'use strict';

  /*  Dependencies  */
  var lib    = require('./lib')
  var gulp   = require('gulp');
  var $      = require('gulp-load-plugins')({lazy:false});
  var del    = require('del');

  /* Tasks */

var tasks = lib.tasks

//================== DEV
gulp
  .task( 'default',
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

// gulp
//   .task('default',
//     $.sequence('clean',
//                'build:stage',
//                'start:stage'));

// // ====== BUILD

// gulp
//   .task('js:stage', tasks.js.stage)
//   .task('css:stage', tasks.css.stage)
//   .task('styl:stage', tasks.styl.stage)
//   .task('html:stage', tasks.html.stage)
//   .task('jade:stage', tasks.jade.stage)
//   .task('images:stage', tasks.images.stage)
//   .task('build:stage',
//     $.sequence('js:stage',
//                'css:stage',
//                'styl:stage',
//                'html:stage',
//                'jade:stage',
//                'images:stage'));

// ======= START


/*  TODO

  BUILD the stage tasks
  There are descriptions on what is needed in order to use build each task within the task file.
  Declare each Task
  The run the declared tasks using $.sequence
  Example

    gulp
      .task('stage',
        $.sequence(  'build:stage'
                     'start:stage'))

    gulp
      .task('js:stage'   , tasks.js.stage   )
      .task('css:stage'  , tasks.css.stage  )
      .task('html:stage' , tasks.html.stage )
      .task('build:stage',
        $.sequence( 'js:stage'
                  , 'css:stage'
                  , 'html:stage'))

    gulp
      .task('stage:stage',
        $.sequence( / LIST TASKS HERE /))

*/


//

//================== CLEAN
gulp
  .task('clean', del.bind(null, ['build']));



})();