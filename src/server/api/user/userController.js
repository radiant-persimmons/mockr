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
      if (!user) return reportError(err, next, 'Could not find user', 404);
      return res.status(200).json(user);
    });
  },

  /**
   * Returns all user models of the database
   */
  getUsers: function (req, res) {
    User.find(function (err, users) {
      if (err) return res.status(500).json({ message: err });
      return res.status(200).json(users);
    });
  },

  /**
   * Updates the user database model
   */
  editUser: function (req, res) {
    var username = req.params.username;
    var newData = req.body;

    User.update({'username': username}, newData, function (err, numberAffected, raw) {
      if (err) return res.status(500).json({ message: err });

      if (!numberAffected) return res.status(404).json({ message: 'User not found' });

      return res.status(201).end();
    });
  }
};
