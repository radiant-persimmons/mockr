describe('user service', function() {
  /**
   * $httpBackend is used to fake backend for Angular tests. Define placeholder
   * services here (e.g. `user`) so you can reference them later in tests.
   */
  var $httpBackend;
  var user;

  // load necessary modules; typically will only be the one you're testing
  beforeEach(module('app.services.user'));

  /**
   * have Angular inject providers into your placeholder variables
   * it intelligently removes the _'s to reference the actual provider. This
   * is done so you can refer to the original name without any naming conflicts
   */
  beforeEach(inject(function(_$httpBackend_, _user_) {
    $httpBackend = _$httpBackend_;
    user = _user_;
  }));

  // basic questions, proof of concept that things are loading correctly
  describe('user', function() {
    it('should exist', function() {
      expect(user).to.be.a('object');
    });

    it('should have certain keys', function() {
      expect(user).to.have.keys(['getUser', 'loggedIn', 'registerCb']);
    });
  });

  describe('#activate', function() {

    it('should activate with a call to api', function() {
      /**
       * you tell `$httpBackend` to listen to certain requests and respond
       * with whatever you tell it. Look into $httpBackend docs for more info
       * on options available
       */
      $httpBackend
        .expectGET('/api/user')
        .respond(200, { username: 'AndrewSouthpaw' });

      // tell backend to process the requests that have been made
      $httpBackend.flush();

      // in this case, test that method called route and stored expected info
      expect(user.getUser()).to.eql({ username: 'AndrewSouthpaw' });
    });

  });

  describe('#loggedIn', function() {

    it('should return true when signed in', function() {
      $httpBackend
        .expectGET('/api/user')
        .respond(200, { username: 'AndrewSouthpaw' });
      $httpBackend.flush();
      expect(user.loggedIn()).to.equal(true);
    });

    it('should return false when not signed in', function() {
      $httpBackend
        .expectGET('/api/user')
        .respond(200, undefined);
      $httpBackend.flush();
      expect(user.loggedIn()).to.equal(false);
    });

  });

  describe('#registerCb', function() {

    it('should take callbacks', function() {
      var cb = function() { console.log('hello'); };
      expect(user.registerCb(cb)).to.equal(true);
    });

    it('should throw error on bad input', function() {
      var cb = 'hello';
      expect(user.registerCb.bind(cb)).to.throw(/only takes functions as callbacks/);
    });

    it('should execute callbacks after user is resolved', function() {
      $httpBackend
        .expectGET('/api/user')
        .respond(200, { username: 'Andrew' });

      // tracers for cb
      var success1 = false;
      var success2 = false;

      // set callbacks
      var cb1 = function() { success1 = true; };
      var cb2 = function() { success2 = true; };
      user.registerCb(cb1);
      user.registerCb(cb2);

      // resolve user
      $httpBackend.flush();
      expect(success1).to.equal(true);
      expect(success2).to.equal(true);
    });

    it('should immediately invoke registered callbacks after resolve', function() {
      $httpBackend
        .expectGET('/api/user')
        .respond(200, { username: 'Andrew' });

      $httpBackend.flush();
      var success = false;
      var cb = function() { success = true; };
      user.registerCb(cb);
      expect(success).to.equal(true);
    });

  });

});
