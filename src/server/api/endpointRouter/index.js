var endpointRouterController = require('./endpointRouterController.js');

module.exports = function(router) {
  router.get('/1/:username/*', endpointRouterController.handler );
  router.post('/1/:username/*', endpointRouterController.handler );
  router.put('/1/:username/*', endpointRouterController.handler);
  router.delete('/1/:username/*', endpointRouterController.handler);
};

