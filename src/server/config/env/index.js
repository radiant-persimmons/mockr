var join = require('path').join;
var _ = require('lodash');
var nconf = require('nconf');

nconf
  // grab flags, e.g. --foo bar --> nconf.get('foo') === 'bar'
  .argv()
  // grab process.env
  .env()
   // load local.env if exists
  .file({ file: __dirname + '/../local.env.json' });

var all = {

  env: nconf.get('NODE_ENV') || 'development',

  // Server port
  port: nconf.get('PORT') || 3000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  // JWT token
  jwtTokenSecret: nconf.get('JWT_TOKEN_SECRET'),

  // Express session
  expressSessionSecret: nconf.get('EXPRESS_SESSION_SECRET'),

  github: {
    clientID: nconf.get('GITHUB_KEY'),
    clientSecret: nconf.get('GITHUB_SECRET'),
    callback: nconf.get('GITHUB_CALLBACK')
  }

};

module.exports = _.merge(
  all,
  require('./' + all.env + '.js') || {});
