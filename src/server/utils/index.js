var User = require('../api/user/userModel');

var createUserIfNotExistant = function(user, cb) {
  var newUser = new User({ 'username': user.username, 'userID': user.id });
  newUser.save(function (err) {
    if (err){
      return console.log('Error: ', err);
      cb(err, null);
    } 
    console.log('User created');
    cb(null, true);
  });
};

module.exports = {
  createUserIfNotExistant: createUserIfNotExistant
}