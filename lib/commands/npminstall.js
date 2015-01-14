var path = require('path');
var shelljs = require('shelljs/global');
var repeater = require('../repeater');

module.exports = function(){

    var command = function(moduleName, moduleRepo, done){
        console.info('cox is running NPM Install for the', moduleName, 'module');
        cd('modules/'+moduleName);
        if (exec('npm install').code !== 0) {
          console.error('Error: npm install didn\'t run for ' + moduleName);
          process.exit(1);
        }
        cd('../..');
        done();
    };

    repeater(command, function(){
        console.log('cox has successfully run the task npmInstall');
    });

};
