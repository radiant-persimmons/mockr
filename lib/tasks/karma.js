var karma = require('karma').server;

module.exports = function($, gulp, paths){

  /**
   * @name karma
   * @task karma
   * @description Runs client-side tests
   * @return {Stream}
   */
  return function(done) {
    return karma.start({
      configFile: paths.spec.root + '/karma.conf.js',
      singleRun: true
    }, done);
  };

};
