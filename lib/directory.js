(function() {
  'use strict';
  var path     = require('path')
  var fs       = require('fs-utils');
  var _        = require('lodash');

  /**
   * directory builder
   * @description            Create a json file for all your paths
   * @return {Object}        return the paths object
   */
  module.exports = function() {

    var paths = { root  : join('')
                , bower : join('lib', 'bower_components')
                , server:   { root     : join('src', 'server')
                            , js       : join('src', 'server', '**/*.js')
                            }
                , client:   { root     : join('src', 'client')
                            , index    : join('src', 'client', 'index.html')
                            , images   : join('src', 'client', 'images', '**/*')
                            , js       : join('src', 'client', 'app', '**/*.js')
                            , css      : join('src', 'client', 'app', '**/*.css')
                            , jade     : join('src', 'client', 'app', '**/*.jade')
                            , html     : join('src', 'client', 'app', '**/*.html')
                            , styl     : { all  : join('src', 'client', 'app', '**/*.styl')
                                         , index: join('src', 'client', 'app', 'index.styl')}
                            }
                , spec:     { root   : join('src', 'spec')
                            , client : { unit: join('src', 'client', 'app', '**/*.spec.js')
                                       , integration: join('src', 'spec', 'client', 'integration', '**/*.js')
                                       , e2e: join('src', 'spec', 'client', 'e2e', '**/*.js')
                                       }
                            , server : { unit: join('src', 'server', '**/*.spec.js')
                                       , integration: join('src', 'spec', 'server', 'integration', '**/*.js')
                                       }
                            }
                , coverage: { root : join('coverage')
                            , lcov : { client : join('coverage', 'client', 'lcov.info')
                                     , server: join('coverage', 'lcov.info')
                                     }
                            }
                , build:    { root   : join('build')
                            , index  : join('build', 'index.html')
                            , js     : join('build', 'js'     , '**/*.js')
                            , css    : join('build', 'css'    , '**/*.css')
                            , html   : join('build', 'html'   , '**/*.html')
                            , vendor : join('build', 'vendor' , '**/*')
                            , dir   : { js     : join('build', 'js')
                                      , css    : join('build', 'css')
                                      , html   : join('build', 'html')
                                      , vendor : join('build', 'vendor')
                                      , images : join('build', 'images')
                                      }
                            }
                }



    fs.writeJSONSync(join('paths.json'), paths);
    return paths;

    function join(){
      var dirs = [__dirname, '/..'].concat(Array.prototype.slice.call(arguments));
      return path.join.apply(path.join, dirs);
    }
  };

})()
