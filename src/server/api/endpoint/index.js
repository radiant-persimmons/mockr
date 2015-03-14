var Endpoint = require('./endpointController');
var auth = require('../../auth/authController');

module.exports = function(router) {
  router.route('/api/users/:username/endpoints')
    .get(auth.isAuthenticatedUser, Endpoint.getEndpoints)
    .post(auth.isAuthenticatedUser, Endpoint.createEndpoint);

  router.route('/api/users/:username/endpoints/*')
    .get(auth.isAuthenticatedUser, Endpoint.getEndpoint)
    .put(auth.isAuthenticatedUser, Endpoint.editEndpoint)
    .delete(auth.isAuthenticatedUser, Endpoint.deleteEndpoint);
};
