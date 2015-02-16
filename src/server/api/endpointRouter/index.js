var endpointRouterController = require('./endpointRouterController.js');

module.exports = function(router) {

  router.get('/:username/*', endpointRouterController.getData );
};