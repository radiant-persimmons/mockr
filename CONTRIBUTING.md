# Contributing

## General Workflow

1. Read the [git flow branching model](http://nvie.com/posts/a-successful-git-branching-model/)
1. If you do not have collaborator access, fork the repo
1. Cut a namespaced branch
  1. Feature branches are cut from `develop`
    - `feature-<name>-#<issueNumber>`
  1. Hotfix branches are cut from `master`
    - `hotfix-<name>`
1. Make commits to your feature branch. Commits are written in present tense.
1. When you've finished with your fix or feature, Rebase upstream changes into your branch.
  1. Follow directions in the [Git Flow wiki page](https://github.com/radiant-persimmons/mockr/wiki). 
  1. Submit a pull request to the branch from which yours was cut (i.e. `master` for `hotfix`, or `develop` for `feature`. Include a description of your changes.
1. In most cases, your branch should not break **TODO: [the build]()**. You can run build tests on your local machine with `npm test`. If your branch does not pass specs, explain why in your pull request.
1. Your pull request will be reviewed by another maintainer.
1. Fix any issues raised by your code reviwer, and push your fixes as a single new commit.
1. Once the pull request has been reviewed, it will be merged by the Scrum Master. The Scrum Master may choose to delegate review and merging of pull requests to other collaborators.
