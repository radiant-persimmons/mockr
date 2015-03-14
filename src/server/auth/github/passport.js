var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request = require('request');
var utils = require('../../utils');

module.exports.setup = function(config) {
  passport.use('github',
    new OAuth2Strategy({
      authorizationURL: 'https://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callback
    },
    function (accessToken, refreshToken, profile, done) {
      request({
        method: 'GET',
        uri: 'https://api.github.com/user?access_token=' + accessToken,
        headers: {
          'User-Agent': 'Shortly-Express'
        }
      }, function (err, res, body) {
        // Extract username and image URL
        body = JSON.parse(body);
        var user = {
          username: body.login,
          userID: body.id,
          avatar: body.avatar_url /* jshint ignore:line */
        };

        utils.createUserIfNotExistant(user, function(err, hasbeenCreated) {
          done(null, user);
        });
      });
    }
  ));
};
