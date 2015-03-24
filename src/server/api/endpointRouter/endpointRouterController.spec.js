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
      methods: {},
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
    // Provide way to yield a meaningful endpoint
    EndpointModelStub.findOne.withArgs(sinon.match({ username: 'Andrew', route: 'api/test' }))
      .yields(null, endpoint);
    // Provide way to yield no endpoint match
    EndpointModelStub.findOne.withArgs(sinon.match({ username: 'null' }))
      .yields(null, null);
    // Provide way to yield error
    EndpointModelStub.findOne.withArgs(sinon.match({ username: 'error' }))
      .yields('error');

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
    ctrl.changeDataHandler = sidedoor.get(__dirname + '/endpointRouterController');
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
    var utils = require('../../utils');
    var req;
    var res;
    var next;

    beforeEach(function() {
      req = {
        method: 'GET',
        params: {
          username: 'Andrew',
          '0': 'api/test'
        }
      };

      res = {

      };

      next = sinon.stub();

      sinon.stub(utils, 'incrementCallCount');
      // Set way to return meaningful result
      utils.incrementCallCount.withArgs('Andrew')
        .yields(null);
      // and way to produce error
      utils.incrementCallCount.withArgs('error')
        .yields('error');

    });

    afterEach(function() {
      utils.incrementCallCount.restore();
    });

    it('should block unsupported methods', function() {
      // override for this test
      req.method = 'PATCH';
      ctrl.handler(req, res, next);
      expect(reportErrorStub.called).to.be.true;
    });

    describe('finding an endpoint', function() {
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

    describe('incrementing call count', function() {
      it('should catch errors', function() {
        // trigger error
      });
    });
  });

});
























