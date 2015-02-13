var passport = require('passport');
var FitbitApiClient = require('fitbit-node');
var Fitbit = require('../../utils/fitbit.js');

passport.use(fitbit.fitbitStrategy);

var signup = function(req, res, next) {
  
};

var login = function(req, res, next) {

};

module.exports = {
  signup: signup,
  login: login
}