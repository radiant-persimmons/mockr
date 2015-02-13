var paths  = require('../directory.js')();
var paths  = require('../../paths.json');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy:true});

module.exports = {
  js     : require('./js'     )($, gulp, paths),
  css    : require('./css'    )($, gulp, paths),
  styl   : require('./styl'   )($, gulp, paths),
  html   : require('./html'   )($, gulp, paths),
  jade   : require('./jade'   )($, gulp, paths),
  server : require('./server' )($, gulp, paths),
  watch  : require('./watch'  )($, gulp, paths),
  vendor : require('./vendor' )($, gulp, paths),
  inject : require('./inject' )($, gulp, paths),
  images : require('./images' )($, gulp, paths),
  coveralls : require('./coveralls' )($, gulp, paths),
  lint : require('./lint' )($, gulp, paths),
  karma : require('./karma' )($, gulp, paths),
  mocha : require('./mocha' )($, gulp, paths)
}


