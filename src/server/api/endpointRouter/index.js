var endpointRouterController = require('./endpointRouterController.js');

module.exports = function(router) {

  router.get('1/:username/*', endpointRouterController.getData );
};