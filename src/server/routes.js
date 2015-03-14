var router = require('express').Router();
var path = require('path');

module.exports = function applicationRouter(app) {
  // Place authentication routes on app
  app.use('/auth', require('./auth')(app));

  // Place API endpoints on router
  require('./api/user')(router);
  require('./api/endpoint')(router);
  require('./api/endpointRouter')(router);


  /**
   * catchall router if the request hasn't been handled by the other routes.
   * Passes off responsibility to ui-router by serving up base index.html
   * and leaves it to ui-router to handle the specific route (either with
   * a state already created or with the otherwise clause)
   */
  router.get('/*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../../build/index.html'));
  });

  // Place router on app
  app.use(router);
};
