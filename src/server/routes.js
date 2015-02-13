var router = require('express').Router();

module.exports = function applicationRouter(app) {
	
  require('./api/user')(router);
  require('./api/endpoint')(router);

  router.get('/*', function(req, res, next) {
    res.render('index');
  });

  app.use(router);
};
