/*jshint -W079 */
/*jshint expr:true */

// Set environment to test, always do this.
process.env.NODE_ENV = 'test';

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var mockery = require('mockery');

describe('UNIT: methodController', function() {
  // Module dependencies to be mocked
  var reportErrorStub;
  var ctrl;

  // Data to be faked
  var req;
  var res;
  var next;
  var username;
  var route;
  var endpoint;

  // Modules with methods to be stubbed
  var utils;

  // Initial scaffolding: mock modules
  before(function() {
    // Stub the reportError dependency
    reportErrorStub = sinon.stub();

    // Set up mockery
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('../../utils/errorReporter', reportErrorStub);

    // Load controller for testing
    ctrl = require('./methodController');

    // Other module dependencies that will be have methods stubbed
    utils = require('../../utils');
  });

  // Set up base fake data
  beforeEach(function() {
    req = {
      method: 'DELETE',
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
      data: [{ id: 1, msg: 'Hello' }],
      count: 0,
      analytics: {}
    };

  });

  // Refresh stub call counts after each test
  afterEach(function() {
    reportErrorStub.reset();
  });

  // Teardown
  after(function() {
    mockery.disable();
  });

  describe('#getData', function() {
    // Stub utils
    beforeEach(function() {
      sinon.stub(utils, 'applyQueries');
    });
    afterEach(function() {
      utils.applyQueries.restore();
    });

    it('calls utils.applyQueries with params', function() {
      ctrl.getData(req, res, next, username, route, endpoint);
      expect(utils.applyQueries.calledWith(req, endpoint.data)).to.be.true;
    });

  });
});
























