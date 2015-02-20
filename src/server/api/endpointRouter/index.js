var endpointRouterController = require('./endpointRouterController.js');

module.exports = function(router) {

  router.get('/1/:username/*', endpointRouterController.getData );
  router.post('1/:username/*', endpointRouterController.postData );
  router.put('1/:username/*', endpointRouterController.changeData);
  router.delete('1/:username/*', endpointRouterController.deleteData);


};

