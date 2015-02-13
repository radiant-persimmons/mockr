module.exports = function($, gulp, paths){

  return {
    /**
     * @name             dev
     * @description      Set the node environment to development
     *                   Require the ./src/server in order to run the server
     * @return {Stream}
     */
    dev: function(){
      $.nodemon({
        script: paths.server.root + '/index.js',
        env: { NODE_ENV: 'development' }
      });
    },
    /**
     * @name             stage
     * @description      Set the node environment to stage
     *                   Require the ./src/server in order to run the server
     * @return {Stream}
     */
    stage: function(){
      // TODO: evaluate later if stage env is appropriate
      $.nodemon({
        script: paths.server.root + '/index.js',
        env: { NODE_ENV: 'development' }
      });
    }
  };
};
