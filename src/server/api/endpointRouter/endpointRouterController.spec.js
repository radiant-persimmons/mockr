/*jshint -W079 */
/*jshint expr:true */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var mockery = require('mockery');
var sidedoor = require('sidedoor');
var reloadStub = require('../../../spec/utils/reloadStub');

describe('UNIT: endpointRouterController', function() {
  var EndpointModelStub;
  var endpoint;
  var reportErrorStub;
  var ctrl = {};

  // Initial scaffolding: mock dependencies, set base fake data
  before(function() {

    // Standard fake endpoint from db
    endpoint = {
      username: 'Andrew',
      route: 'api/test',
      methods: {
        POST: {
          status: 201,
          headers: '',
          data: 'Created'
        }
      },
      persistence: false,
      schemaDB: {},
      businessLogic: '',
      data: [],
      count: 0,
      analytics: {}
    };

    // Set up Endpoint db model
    EndpointModelStub = {
      findOne: sinon.stub()
    };

    // Stub the reportError dependency
    reportErrorStub = sinon.stub();

    // Set up mockery
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('../endpoint/endpointModel.js', EndpointModelStub);
    mockery.registerMock('../../utils/errorReporter', reportErrorStub);

    // Load controller methods for testing
    ctrl.handler = require('./endpointRouterController').handler;
    ctrl._changeDataHandler = require('./endpointRouterController')._changeDataHandler;
  });

  // Refresh stub call counts after each test
  afterEach(function() {
    EndpointModelStub.findOne.reset();
    reportErrorStub.reset();
  });

  // Teardown
  after(function() {
    mockery.disable();
  });

  describe('#handler', function() {
    var utils;
    var req;
    var res;
    var next;
    var methodController;

    beforeEach(function() {
      req = {
        method: 'GET',
        params: {
          username: 'Andrew',
          '0': 'api/test'
        }
      };

      res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      next = sinon.stub();

      utils = require('../../utils');
      sinon.stub(utils, 'incrementCallCount');
      // Set way to return meaningful result
      utils.incrementCallCount.withArgs('Andrew')
        .yields(null);
      // and way to produce error
      utils.incrementCallCount.withArgs('error')
        .yields('error');

      methodController = require('./methodController');
      sinon.stub(methodController, 'getData');
    });

    afterEach(function() {
      utils.incrementCallCount.restore();
      methodController.getData.restore();
    });

    it('should block unsupported methods', function() {
      // override for this test
      req.method = 'PATCH';
      ctrl.handler(req, res, next);
      expect(reportErrorStub.called).to.be.true;
    });

    describe('finding an endpoint', function() {
      before(function() {
        // Provide way to yield a meaningful endpoint
        EndpointModelStub.findOne.withArgs(sinon.match({ username: 'Andrew', route: 'api/test' }))
          .yields(null, endpoint);
        // Provide way to yield no endpoint match
        EndpointModelStub.findOne.withArgs(sinon.match({ username: 'null' }))
          .yields(null, null);
        // Provide way to yield error
        EndpointModelStub.findOne.withArgs(sinon.match({ username: 'error' }))
          .yields('error');
      });
      after(function() {
        EndpointModelStub.findOne = sinon.stub();
      });

      it('should catch errors on Endpoint.findOne', function() {
        // trigger error
        req.params.username = 'error';
        ctrl.handler(req, res, next);
        expect(reportErrorStub.called).to.be.true;
      });

      it('should report an endpoint not found', function() {
        // trigger endpoint not found
        req.params.username = 'null';
        ctrl.handler(req, res, next);
        expect(reportErrorStub.calledWith(sinon.match.any, sinon.match.any, sinon.match.string, 400)).to.be.true;
      });
    });

    describe('after incrementing call count', function() {
      before(function() {
        // Bypass Endpoint model stub
        EndpointModelStub.findOne.yields(null, endpoint);
      });
      after(function() {
        EndpointModelStub.findOne = sinon.stub();
      });

      it('should catch errors', function() {
        req.params.username = 'error';
        ctrl.handler(req, res, next);
        expect(reportErrorStub.calledWith(sinon.match.any, sinon.match.any, 'Failed to get endpoint data', 500)).to.be.true;
      });

      describe('if endpoint is persistent', function() {
        it('should call methodController', function() {
          endpoint.persistence = true;
          ctrl.handler(req, res, next);
          expect(methodController.getData.calledWith(sinon.match(req),
                                                     sinon.match(res),
                                                     sinon.match.func,
                                                     'Andrew', 'api/test',
                                                     sinon.match(endpoint))).to.be.true;

          // undo changes to base data
          endpoint.persistence = false;
        });
      });

      describe('if endpoint is not persistent', function() {
        it('should return error if no response set for that method', function() {
          // using GET method...
          ctrl.handler(req, res, next);
          expect(reportErrorStub.calledWith(sinon.match.any, sinon.match.any, sinon.match.string, 400)).to.be.true;
        });
        it('should send back status code and data', function() {
          req.method = 'POST';
          ctrl.handler(req, res, next);
          expect(res.status.calledWith(endpoint.methods.POST.status)).to.be.true;
          expect(res.status().json.calledWith(sinon.match(endpoint.methods.POST.data))).to.be.true;
        });
      });
    });
  });

  describe('#_changeDataHandler', function() {
    var req;
    var res;
    var next;
    var username;
    var route;
    var utils;
    var methodController;

    beforeEach(function() {
      req = {
        method: 'GET',
        params: {
          username: 'Andrew',
          '0': 'api/test'
        },
        query: {
          id: '1'
        }
      };

      res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      next = sinon.stub();
      username = 'Andrew';
      route = 'api/test';

      utils = require('../../utils');
      sinon.stub(utils, 'lookForDataPoint');
      // Set way to return meaningful result
      utils.lookForDataPoint.withArgs('Andrew')
        .yields(null);
      // and way to produce error
      utils.lookForDataPoint.withArgs('error')
        .yields('error');
      sinon.stub(utils, 'removeDataFromDb');

      methodController = require('./methodController');
      sinon.stub(methodController, 'getData');
    });

    afterEach(function() {
      utils.lookForDataPoint.restore();
      utils.removeDataFromDb.restore();
      methodController.getData.restore();
    });

    it('should require query ID to be in request', function() {
      // modify req
      delete req.query.id;
      ctrl._changeDataHandler(req, res, next, username, route, endpoint);
      expect(reportErrorStub.args[0][3]).to.equal(400);

      // reset req
      req.query.id = 1;
    });


  });

});
























