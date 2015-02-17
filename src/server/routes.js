var router = require('express').Router();
var path = require('path');

module.exports = function applicationRouter(app) {

  require('./api/auth')(router);
  require('./api/user')(router);
  require('./api/endpoint')(router);
  require('./api/endpointRouter')(router);

  router.get('/home', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../../build/index.html'));
  });

  router.get('/*', function(req, res, next) {
    res.redirect('/');
  });

  app.use(router);
};
