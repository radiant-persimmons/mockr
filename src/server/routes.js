var router = require('express').Router();

module.exports = function applicationRouter(app) {

  // Mount routes to router
  require('./api/user')(router);
  require('./api/endpoint')(router);

  // Catch all routes and send to Angular for handling
  router.get('/*', function(req, res, next) {
    res.redirect('/');
  });

  app.use(router);
};
