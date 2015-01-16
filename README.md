# cox
CLI commander for developing with our current module system  
Allows for running necessary tasks in the project folder and all the modules  
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
Then runs `npm install` in these repositories too.

#### update
```
cox update
```
runs npm update in the project folder and in all modules


### Start
```
cox start XE-1234
```
Start developing on a new branch <ticket>


#### checkout
```
cox checkout XE-1234
//or to checkout a new branch:
cox checkout -b XE-1234
```
Change to another branch <ticket>

#### reset
```
cox reset
```
runs 'git reset --hard' on all repos

#### pull
```
cox pull
```
GIT pulls the latest changes in the current branch

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
cox push <ticket>
```
GIT pushes the latest changes in the current branch

#### kill
```
cox kill <ticket>
```
checks out develop and kills the branch locally

*Please use Cox responsibly, don't forget to use protection.*