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
Then is runs `npm install` in these repositories.
### NPM Install
```
cox npm install
```
Runs `npm install` in the existing repositories.
