var User = require('../api/user/userModel');

var createUserIfNotExistant = function(myUser, cb) {
  User.findOne({'username': myUser.username}, function(err, user) {
    if(!user) {
      var newUser = new User({ 'username': myUser.username, 'userID': myUser.id });
      newUser.save(function (err, user) {
        if (err){
          console.log('Error: ', err);
          return cb(err, null);
        } 
        console.log('User created');
        return cb(null, user);
      });
    } else {
      return cb(null, user);
    }
  });
};

module.exports = {
  createUserIfNotExistant: createUserIfNotExistant
};