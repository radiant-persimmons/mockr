var User = require('../api/user/userModel');

var createUserIfNotExistant = function(user, cb) {
  User.findOneAndUpdate({ username: user.username }, user,
                        { upsert: true }, function(err, numAffected, raw) {
    if (err) return cb(err, null);
    return cb(null, user);
  });
};


module.exports = {
  createUserIfNotExistant: createUserIfNotExistant
};
