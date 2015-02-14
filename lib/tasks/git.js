var nconf = require('nconf');

module.exports = function($, gulp, paths){

  return {

    /**
     * @name rebase
     * @task git:rebase
     * @note Must pass in the name of target branch with `--b name`
     * @description Rebases the input branch off a fresh develop.
     * @return {Stream}
     */
    rebase: function() {
      nconf.argv();
      if (!nconf.get('b')) {
        console.log('Please specify a branch name: --b name');
        return;
      }

      return gulp.src('')
        .pipe($.shell([
          'git checkout develop',
          'git pull origin develop',
          'git checkout ' + nconf.get('b'),
          'git rebase develop'
        ]))
    },

    /**
     * @name push
     * @task git:push
     * @note Must pass in the name of target branch with `--b name`
     * @description Pushes the branch to origin
     * @return {Stream}
     */
    push: function(){
      nconf.argv();
      if (!nconf.get('b')) {
        console.log('Please specify a branch name: --b name');
        return;
      }

      return gulp.src('')
        .pipe($.shell([
          'git push origin ' + nconf.get('b')
        ]));
    }
  }
};
