var User = require('../api/user/userModel');

var createUserIfNotExistant = function(user, cb) {
  User.findOne({'username': user.username}, function(err, existingUser) {
    if(!existingUser) {
      var newUser = new User({ 'username': user.username, 'userID': user.id });
      newUser.save(function (err, userCreated) {
        if (err){
          console.log('Error: ', err);
          return cb(err, null);
        }
        console.log('User created');
        return cb(null, userCreated);
      });
    } else {
      return cb(null, existingUser);
    }
  });
};

module.exports = {
  createUserIfNotExistant: createUserIfNotExistant
};
