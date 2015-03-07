/*jshint -W079 */


var Endpoint = require('./endpointModel.js');
var expect = require('chai').expect;


describe('Unit: Endpoint Model', function() {
  beforeEach(function (done) {
    Endpoint.remove({}, function() {
      done();
    });
  });

  it('should not store the endpoint if there is no username or route', function(done) {
    var endpoint = new Endpoint({
      username: 'Jake'
    });

    endpoint.save(function () {
      Endpoint.find({ username: 'Jake'}, function(err, endpoint) {
        console.log('endpoints', endpoint);
        expect(endpoint.length).to.equal(0);
        done();
      });
    });
  });

  it('stores username, route, methods, persistence, businessLogic, data and count', function(done) {
    var endpoint = new Endpoint({
      username: 'Jake',
      route: 'messages',
      methods: {},
      persistence: true,
      businessLogic: 'hey',
      data: [],
      count: 0
    });

    endpoint.save(function () {
      Endpoint.findOne({ username: 'Jake', route: 'messages'}, function (err, endpoint) {
        expect(endpoint.username).to.equal('Jake');
        expect(endpoint.route).to.equal('messages');
        expect(endpoint.methods).to.be.instanceof(Object);
        expect(endpoint.persistence).to.equal(true);
        expect(endpoint.businessLogic).to.equal('hey');
        expect(endpoint.data).to.be.instanceof(Array);
        expect(endpoint.count).to.equal(0);
        done();
      });
    });
  });

});