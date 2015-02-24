var User = require('../api/user/userModel');

var createUserIfNotExistant = function(user, cb) {
  User.findOneAndUpdate({ username: user.username }, user,
                        { upsert: true }, function(err, numAffected, raw) {
    if (err) return cb(err, null);
    console.log('numAffected', numAffected);
    console.log('raw response', raw);
    console.log('new user created', user);
    return cb(null, user);
  });
  // User.findOne({'username': user.username}, function(err, existingUser) {
  //   if(!existingUser) {
  //     var newUser = new User({ 'username': user.username, 'userID': user.id });
  //     newUser.save(function (err, userCreated) {
  //       if (err){
  //         console.log('Error: ', err);
  //         return cb(err, null);
  //       }
  //       console.log('User created');
  //       return cb(null, userCreated);
  //     });
  //   } else {
  //     return cb(null, existingUser);
  //   }
  // });
};

module.exports = {
  createUserIfNotExistant: createUserIfNotExistant
};


// Endpoint.findOneAndUpdate({ 'username': username, 'route': route }, newData, {upsert: true},function(err, numberAffected, raw) {
//   if (err) {
//     return res.status(500).end();
//   }
//   res.status(201).end();
// });
