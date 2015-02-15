var Endpoint = require('./endpointController.js');

module.exports = function(router) {
  router.route('/api/users/:user/endpoints')
    .get(Endpoint.getEndpoints)
    .post(Endpoint.createEndpoint);

  router.route('/api/users/:user/endpoints/:id')
    .get(Endpoint.getEndpoint)
    .put(Endpoint.editEndpoint)
    .delete();
};