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
        env: { NODE_ENV: 'development' },
        /**
         * Nodemon watches all files from the directory it executes, in this
         * case the root directory. Must manually ignore all the non-server
         * files in order to prevent server reload on the file changes that
         * don't affect the server.
         */
        ignore: [
          'build/**/*',
          'coverage/**/*',
          'lib/**/*',
          'logs/**/*',
          'node_modules/**/*',
          'src/client/**/*',
          'src/spec/**/*'
        ]
      });
    },
    /**
     * @name             stage
     * @description      Set the node environment to stage
     *                   Require the ./src/server in order to run the server
     * @return {Stream}
     */
    stage: function(){
      $.nodemon({
        script: paths.server.root + '/index.js',
        env: { NODE_ENV: 'development' },
        /**
         * Nodemon watches all files from the directory it executes, in this
         * case the root directory. Must manually ignore all the non-server
         * files in order to prevent server reload on the file changes that
         * don't affect the server.
         */
        ignore: [
          'build/**/*',
          'coverage/**/*',
          'lib/**/*',
          'logs/**/*',
          'node_modules/**/*',
          'src/client/**/*',
          'src/spec/**/*'
        ]
      });
    }
  };
};
