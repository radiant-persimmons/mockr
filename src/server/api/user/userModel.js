var mongoose = require('mongoose');
var db = require('../../db');

var userSchema = mongoose.Schema({
  // GitHub username, same for mockr
  username: { type: String, required: true },

  // GitHub user ID
  userID: { type: Number, required: true},

  // GitHub avatar URL
  avatar: { type: String },

  /**
   * stores endpoint IDs belonging to user using flat database structure
   * (instead of nested objects) to keep individual objects lightweight.
   * Comes at the expense of multiple queries, which was deemed acceptable.
   */
  endpoints: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;

