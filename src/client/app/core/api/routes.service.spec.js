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


});
