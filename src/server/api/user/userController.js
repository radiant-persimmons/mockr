var reportError = require('../../utils/errorReporter');
var User = require('./userModel');

module.exports = {
  /**
   * Returns session user
   */
  getCurrentUser: function(req, res){
    res.status(200).json(req.user);
  },

  /**
   * Creates user from request and saves to database
   */
  createUser: function (req, res, next) {
    var username = req.body.username;
    var userID = req.body.userID;
    var newUser = new User({ 'username': username, 'userID': userID });
    newUser.save(function (err) {
      if (err) return reportError(err, next, 'Error saving user model', 500);
      return res.status(201).end();
    });
  },

  /**
   * Returns the database model associated with a username
   */
  getUser: function (req, res, next) {
    var username = req.params.username;
    User.findOne({'username': username}, function (err, user) {
      if (err) return reportError(err, next, 'Error finding user', 500);
      if (!user) return reportError(new Error('User does not exist'), next, 'Failed to find user ' + username, 400);
      return res.status(200).json(user);
    });
  },

  /**
   * Returns all user models of the database
   */
  getUsers: function (req, res, next) {
    User.find(function (err, users) {
      if (err) return reportError(err, next, 'Error finding users', 500);
      return res.status(200).json(users);
    });
  },

  /**
   * Updates the user database model
   */
  editUser: function (req, res, next) {
    var username = req.params.username;
    var newData = req.body;

    User.update({'username': username}, newData, function (err, numberAffected, raw) {
      if (err) return reportError(err, next, 'Error updating user', 500);
      if (!numberAffected) return reportError(new Error('User does not exist'), next, 'Failed to edit user ' + username, 400);
      return res.status(201).end();
    });
  }
};
