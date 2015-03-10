/* jshint -W024 */
/* jshint expr:true */

describe('routes service', function() {
  var $httpBackend;
  var routes;
  var user;

  beforeEach(module('app.services.routes'));
  beforeEach(module(function($provide) {
    user = {
      getUser: function() {
        return { username: 'Andrew' };
      }
    };
    $provide.value('user', user);
  }));

  beforeEach(inject(function(_$httpBackend_, _routes_) {
    $httpBackend = _$httpBackend_;
    routes = _routes_;
  }));

  it('should have a certain interface', function() {
    expect(routes).to.be.a('object');
    expect(routes).to.have.keys(['routes',
                                 'addRoute',
                                 'deleteRoute',
                                 'getRoute',
                                 'updateRoute',
                                 'fetch']);
  });

  describe('#addRoute', function() {
    var body;

    it('returns a $http promise object', function() {
      expect(routes.addRoute()).to.be.a('object');
      expect(routes.addRoute()).to.have.keys(['$$state']);
    });

    it('should call $http POST with current user', function() {
      var success = false;

      $httpBackend
        .expectPOST('/api/users/Andrew/endpoints')
        .respond(201);

      routes.addRoute({ route: '/test' })
        .then(function() {
          success = true;
        });
      $httpBackend.flush();

      expect(success).to.be.ok;
    });

    it('should add the route to service.routes on success', function() {
      $httpBackend
        .expectPOST('/api/users/Andrew/endpoints')
        .respond(201);
      routes.addRoute({ route: '/test' });
      $httpBackend.flush();

      expect(routes.routes).to.eql(['/test']);
    });

    it('should not add route to service.routes on failure', function() {
      $httpBackend
        .expectPOST('/api/users/Andrew/endpoints')
        .respond(401);
      routes.addRoute({ route: '/test' });
      $httpBackend.flush();

      expect(routes.routes).to.eql([]);
    });

    it('should pass along body content to $http request', function() {
      body = { route: '/test' };
      var success = false;

      $httpBackend
        .expectPOST('/api/users/Andrew/endpoints', body)
        .respond(201);

      routes.addRoute(body)
        .then(function() {
          success = true;
        });
      $httpBackend.flush();

      expect(success).to.be.ok;
    });
  });

  describe('#deleteRoute', function() {

    var body;

    it('returns a $http promise object', function() {
      expect(routes.deleteRoute()).to.be.a('object');
      expect(routes.deleteRoute()).to.have.keys(['$$state']);
    });

    it('should call $http DELETE with current user', function() {
      var success = false;

      $httpBackend
        .expectDELETE('/api/users/Andrew/endpoints/api/test')
        .respond(201);

      routes.deleteRoute('api/test')
        .then(function() {
          success = true;
        });
      $httpBackend.flush();

      expect(success).to.be.ok;
    });

    it('should remove the route from list of routes on success', function() {
      routes.routes = ['api/test', 'api/test2'];

      $httpBackend
        .expectDELETE('/api/users/Andrew/endpoints/api/test')
        .respond(201);
      routes.deleteRoute('api/test');
      $httpBackend.flush();

      expect(routes.routes).to.eql(['api/test2']);
    });

    it('should not affect routes on failure', function() {
      routes.routes = ['api/test'];

      $httpBackend
        .expectDELETE('/api/users/Andrew/endpoints/api/test')
        .respond(401);
      routes.deleteRoute('api/test');
      $httpBackend.flush();

      expect(routes.routes).to.eql(['api/test']);
    });

  });

  describe('#fetch', function() {
    var body;

    it('returns a $http promise object', function() {
      expect(routes.fetch()).to.be.a('object');
      expect(routes.fetch()).to.have.keys(['$$state']);
    });

    it('should call $http DELETE with current user', function() {
      var success = false;

      $httpBackend
        .expectGET('/api/users/Andrew/endpoints')
        .respond(201);

      routes.fetch('Andrew')
        .then(function() {
          success = true;
        });
      $httpBackend.flush();

      expect(success).to.be.true;
    });

    it('should set routes from server', function() {
      routes.routes = ['api/test2'];

      $httpBackend
        .expectGET('/api/users/Andrew/endpoints')
        .respond([{route: 'api/test1'}]);
      routes.fetch('Andrew');
      $httpBackend.flush();

      expect(routes.routes).to.eql(['api/test1']);
    });

    it('handles an error', function() {
      routes.routes = [];

      $httpBackend
        .expectGET('/api/users/Andrew/endpoints')
        .respond(401);
      routes.fetch('Andrew')

      $httpBackend.flush();

      expect(routes.routes).to.eql([]);
    });


  });

  describe('#getRoute', function() {

    var body;

    it('returns a $http promise object', function() {
      expect(routes.getRoute()).to.be.a('object');
      expect(routes.getRoute()).to.have.keys(['$$state']);
    });

    it('should call $http DELETE with current user', function() {
      var success = false;

      $httpBackend
        .expectGET('/api/users/Andrew/endpoints/api/test')
        .respond(201);

      routes.getRoute('api/test')
        .then(function() {
          success = true;
        });
      $httpBackend.flush();

      expect(success).to.be.true;
    });

    it('should set routes from server', function() {
      var success = false;

      $httpBackend
        .expectGET('/api/users/Andrew/endpoints/api/test')
        .respond({route: 'api/test'});

      routes.getRoute('api/test')
        .then(function(res) {
          console.log('res', res);
          if (res.route === 'api/test') success = true;
        });

      $httpBackend.flush();

      expect(success).to.be.true;
    });

    it('handles an error', function() {
      routes.routes = [];

      $httpBackend
        .expectGET('/api/users/Andrew/endpoints/api/test')
        .respond(401);
      routes.getRoute('api/test')

      $httpBackend.flush();

      expect(routes.routes).to.eql([]);
    });
  });

  describe('#updateRoute', function() {
    it('returns promise object', function() {
      expect(routes.updateRoute({route: 'api/test'})).to.have.keys(['$$state']);
    });

    it('makes a request to server', function() {
      $httpBackend
        .expectPUT('/api/users/Andrew/endpoints/api/test')
        .respond(200);

      routes.updateRoute({route: 'api/test'});

      // No assertions needed; will throw exception if $httpBackend not called
      $httpBackend.flush();
    });

    it('handles error', function() {
      $httpBackend
        .expectPUT('/api/users/Andrew/endpoints/api/test')
        .respond(401);

      routes.updateRoute({route: 'api/test'});

      // No assertions needed; will throw exception if $httpBackend not called
      $httpBackend.flush();
    });
  });
});
