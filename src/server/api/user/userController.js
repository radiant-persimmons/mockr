var User = require('./userModel');

module.exports = {
  createUser: function (req, res) {
    var username = req.body.username;
    var newUser = new User({ 'username': username });
    newUser.save(function (err) {
      if (err){
        res.end();
        return console.log('Error: ', err);
        
      } 
      console.log('User created');
      res.end();
    });
  },

  //TODO: return user, specify user
  getUser: function (req, res) {
    var username = req.params.username;
    User.find({'username': username}, function (err, user) {
      //specify user!!!
      if (err) return console.log('Error: ', err);
      //return user
      console.log(user);
    });
  },


  getUsers: function (req, res) {
    User.find(function (err, users) {
      if (err) return console.log('Error: ', err);
      //return users
      console.log(users);
    });
  },

  //NOT COMPLETE
  //TODO: specify user, lookup format for findAndModify
  editUser: function (req, res) {
    var username = req.params.username;
    User.findAndModify(User, {'username': username}, function (err, users) {
      //specify user!!!
      if (err) return console.log('Error: ', err);
      //return users
      console.log(users);
    });
  }
};