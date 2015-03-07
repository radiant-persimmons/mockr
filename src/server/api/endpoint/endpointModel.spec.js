var Endpoint = require('./endpointModel.js');



describe('Unit: Endpoint Model', function() {
  beforeEach(function (done) {
    Endpoint.remove({}, function() {
      var endpoint = new Endpoint({
        username: 'Jake',
        route: 'messages'
      });
      endpoint.save(function () {
        done();
      });
    });
  });

  it("should have at least an username and route", function() {
  
  });

  it("stores username, route, methods, persistence, businessLogic, data and count", function(done) {
  	
  })

});