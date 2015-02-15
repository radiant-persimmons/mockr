var router = require('express').Router();

module.exports = function applicationRouter(app) {

  require('./api/auth')(router);
  require('./api/user')(router);
  require('./api/endpoint')(router);

  router.get('/:user/:path', function(req, res, next) {
  
  });
  
  router.get('/*', function(req, res, next) {
    res.redirect('/');
  });

  app.use(router);
};
