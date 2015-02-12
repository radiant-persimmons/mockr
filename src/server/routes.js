var router = require('express').Router();

module.exports = applicationRouter(app) {
	
  require('./api/user')(router);
  require('./api/endpoint')(router);

  app.use(router);
};
