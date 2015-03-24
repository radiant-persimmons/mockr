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
        end: sinon.stub(),
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
    var applyQueriesResult;
    beforeEach(function() {
      applyQueriesResult = { id: 2, msg: 'from utils' };
      sinon.stub(utils, 'applyQueries');
      // provide way to error
      utils.applyQueries.withArgs('error')
        .returns(null);
      // and a "normal" result
      utils.applyQueries.withArgs(sinon.match.object, sinon.match.array)
        .returns(applyQueriesResult);
    });
    afterEach(function() {
      utils.applyQueries.restore();
    });

    it('calls utils.applyQueries with params', function() {
      ctrl.getData(req, res, next, username, route, endpoint);
      expect(utils.applyQueries.calledWith(req, endpoint.data)).to.be.true;
    });

    it('should handle return 400 if no document found', function() {
      // force error
      req = 'error';
      ctrl.getData(req, res, next, username, route, endpoint);
      expect(reportErrorStub.args[0][3]).to.equal(400);
    });

    it('should return 200 and data when document found', function() {
      ctrl.getData(req, res, next, username, route, endpoint);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status().json.calledWith(sinon.match(applyQueriesResult))).to.be.true;
    });
  });

  describe('#postData', function() {
    var logic;
    var newContent;
    beforeEach(function() {
      // fake data
      endpoint.businessLogic = 'some logic';
      newContent = {};

      // load other modules needed
      logic = require('../../utils/businessLogic.js');

      // stub module methods
      sinon.stub(logic, 'runLogic');
      // error path
      logic.runLogic.withArgs('error')
        .yields('error', null);
      // regular path
      logic.runLogic.withArgs(sinon.match.string, sinon.match.object, sinon.match.func)
        .yields(null, newContent);

      sinon.stub(utils, 'augmentPostData');
      utils.augmentPostData.returns(newContent);

      sinon.stub(utils, 'insertPostDataToDb');
      utils.insertPostDataToDb.withArgs('error').yields('error');
      utils.insertPostDataToDb.withArgs(sinon.match.string, route, newContent, sinon.match.func)
        .yields(null);

      sinon.stub(utils, 'updateObjectCount');
      utils.updateObjectCount.withArgs('error2').yields('error');
      utils.updateObjectCount.withArgs(username, route, endpoint, sinon.match.func)
        .yields(null);

    });

    afterEach(function() {
      logic.runLogic.restore();
      utils.augmentPostData.restore();
      utils.insertPostDataToDb.restore();
      utils.updateObjectCount.restore();
    });

    it('runs business logic', function() {
      ctrl.postData(req, res, next, username, route, endpoint);
      expect(logic.runLogic.calledWith(endpoint.businessLogic, req, sinon.match.func)).to.be.true;
    });

    it('handles error from business logic', function() {
      // trigger error
      endpoint.businessLogic = 'error';
      ctrl.postData(req, res, next, username, route, endpoint);
      expect(reportErrorStub.called).to.be.true;
    });

    it('returns 500 and newContent.res if present', function() {
      newContent.res = 'present';
      ctrl.postData(req, res, next, username, route, endpoint);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.status().json.calledWith(newContent.res)).to.be.true;
    });

    it('augments newContent', function() {
      ctrl.postData(req, res, next, username, route, endpoint);
      expect(utils.augmentPostData.calledWith(newContent, endpoint)).to.be.true;
    });

    describe('inserts post into database', function() {
      it('handles an error in return', function() {
        username = 'error';
        ctrl.postData(req, res, next, username, route, endpoint);
        expect(reportErrorStub.called).to.be.true;
      });

      describe('updates object count', function() {
        it('calls utils.updateObjectCount with correct params', function() {
          ctrl.postData(req, res, next, username, route, endpoint);
          expect(utils.updateObjectCount.calledWith(username, route, endpoint, sinon.match.func)).to.be.true;
        });

        it('handles an error in return', function() {
          username = 'error2';
          ctrl.postData(req, res, next, username, route, endpoint);
          expect(reportErrorStub.called).to.be.true;
        });

        it('returns 201 on completion', function() {
          ctrl.postData(req, res, next, username, route, endpoint);
          expect(res.status.calledWith(201)).to.be.true;
          expect(res.status().end.called).to.be.true;
        });
      });
    });
  });

  describe('#updateData', function() {
    var dataPoint;
    var newContent;
    beforeEach(function() {
      // fake data
      req.body = {};
      dataPoint = {};
      newContent = {};

      // stub utils
      sinon.stub(utils, 'updateData');
      utils.updateData.returns(newContent);

      sinon.stub(utils, 'insertPostDataToDb');
      utils.insertPostDataToDb.withArgs('error').yields('error');
      utils.insertPostDataToDb.withArgs(sinon.match.string).yields(null);
    });

    afterEach(function() {
      utils.updateData.restore();
      utils.insertPostDataToDb.restore();
    });

    it('calls utils.updateData', function() {
      ctrl.updateData(req, res, next, username, route, dataPoint);
      expect(utils.updateData.calledWith(req.body, dataPoint)).to.be.true;
    });

    it('inserts data to db', function() {
      ctrl.updateData(req, res, next, username, route, dataPoint);
      expect(utils.insertPostDataToDb.calledWith(username, route, newContent, sinon.match.func)).to.be.true;
    });

    describe('after inserting to db,', function() {
      it('handles an error in response', function() {
        // force error
        username = 'error';
        ctrl.updateData(req, res, next, username, route, dataPoint);
        expect(reportErrorStub.called).to.be.true;
      });

      it('returns 201 on success', function() {
        ctrl.updateData(req, res, next, username, route, dataPoint);
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.status().end.called).to.be.true;
      });
    });
  });


});
























