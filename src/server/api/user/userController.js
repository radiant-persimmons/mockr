var User = require('./userModel');

module.exports = {
  createUser: function (req, res) {
    var username = req.body.username;
    var userID = req.body.userID;
    var newUser = new User({ 'username': username, 'userID': userID });
    newUser.save(function (err) {
      if (err){
        res.end();
        return console.log('Error: ', err);
        
      } 
      console.log('User created');
      res.status(201).end();
    });
  },

  //TODO: return user, specify user
  getUser: function (req, res) {
    var username = req.params.username;
    User.findOne({'username': username}, function (err, user) {
      //specify user!!!
      if (err) return console.log('Error: ', err);
      //return user
      console.log(user);
      res.json(user);
    });
  },


  getUsers: function (req, res) {
    User.find(function (err, users) {
      if (err) return console.log('Error: ', err);
      //return users
      console.log(users);
      res.json(users);
    });
  },

  editUser: function (req, res) {
    var username = req.params.username;
    var newData = req.body;

    User.update({'username': username}, newData, function (err, numberAffected, raw) {
      //specify user!!!
      if (err) return console.log('Error: ', err);

      if (!numberAffected) return res.status(404).end('User not found.');
      
      //return users
      console.log('user modified', raw);
      res.status(201).end();
    });
  }
};