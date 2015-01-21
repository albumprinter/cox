# cox
CLI commander for developing with multiple submodules, each with their own Git repository.
Cox runs both Git and NPM-related tasks on the project source folder, as well as all the versioned submodules.

As such, a "cox checkout <branchName>" should be seen as : check out branch <branchName> in the project root, AS WELL
as in all the submodules' repositories. This allows you to create a new feature (one that might affect contents in
multiple submodules) recursively in a single command (see "cox start").

All Cox commands should be run from the root of the main project.  

## Installation
```
npm install -g cox
```

## Usage

### Install
```
cox install
```
installs all the project modules, defined in `package.json` `coxDependencies`, like:
```
  "coxDependencies": {
    "some-lib": "git@github.com:username/some-lib.git",
    "some-other-lib": "git@github.com:username/some-other-lib.git",
  }
```
Then runs `npm install` on these repositories too.

#### update
```
cox update
```
runs npm update in the project folder and in all submodules


### Start
```
cox start <branchName>
```
Start developing on a new branch with given <branchName>

#### checkout
```
cox checkout <branchName>
//or to checkout a new branch:
cox checkout -b <branchName>
```
Change to another branch <branchName>

#### reset
```
cox reset
```
runs 'git reset --hard'.

#### pull
```
cox pull
```
GIT pulls the latest changes in the current branch.

#### status
```
cox status
```
displays the GIT status of all repos

#### diff
```
cox diff
```
displays the GIT diff of all repos

#### add
```
cox add
```
runs git add to all files unstaged in all repos

#### commit
```
cox commit "<message>"
```
commits staged changes to all the repos with given message

#### push
```
cox push <branchName>
```
GIT pushes the latest changes in the current branch to origin

#### kill
```
cox kill <branchName>
```
checks out develop, kills the branch locally and kills the branch remotely on origin (!)

*Please use Cox responsibly, don't forget to use protection.*
