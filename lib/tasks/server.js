module.exports = function($, gulp, paths){

  return {
    /**
     * @name             dev
     * @description      Set the node environment to development
     *                   Require the ./src/server in order to run the server
     * @return {Stream}
     */
    dev: function(){
      process.env.NODE_ENV = 'development';
      require(paths.server.root)
    },
    /**
     * @name             stage
     * @description      Set the node environment to stage
     *                   Require the ./src/server in order to run the server
     * @return {Stream}
     */
    stage: function(){}
  };
};