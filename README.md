# cox
git commander for multi-repositories

## Install
```
npm install -g cox
```

## Usage

### Install
```
cox install
```
Install git repositories defined in `package.json` `coxDependencies`, like:
```
  "coxDependencies": {
    "some-lib": "git@github.com:username/some-lib.git",
    "some-other-lib": "git@github.com:username/some-other-lib.git",
  }
```
Then runs `npm install` in these repositories too.

### Start
```
cox start <<branch-name>>
```
Create a new branch with name ```<<branch-name>>``` in all repositories.

### npm commands
#### npm install
```
cox npm install
```
Runs `npm install` in the existing repositories.
#### npm update
```
cox npm update
```
Runs `npm update` in the existing repositories.

### git commands
#### git pull
```
cox pull
```
Pull in all repositories.

#### git reset --hard
```
cox reset
```
Reset all repositories.

#### git checkout
```
cox checkout <<branch-name>>
```
Checkout a branch ```<<branch-name>>``` in all repositories.

#### git status
```
cox status
```
Status in all repositories.

#### git diff
```
cox diff
```
Diff in all repositories.
Can be combined, like:
```
cox diff | less
```
