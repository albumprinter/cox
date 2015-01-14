var fs = require('fs');
var path = require('path');
var repeater = require('../repeater');
var nodegitOptions = require('../nodegitoptions');
var npmCommand = require('./npm');

var modulesDir = 'modules';

module.exports = function(args){
    //[TODO] check args for different module folder 
    var modulesPresent = ls(process.cwd()).indexOf(modulesDir) > -1;
    if(!modulesPresent){
        mkdir(modulesDir);
    }
    var installedModules = ls(modulesDir);

    var command = function(moduleName, moduleRepo, done){
        console.info( ('cloning ' + moduleName + ' from ' + moduleRepo).action );
        if(installedModules.indexOf(moduleName) > -1){
            console.info( (moduleName + ' is already present in folder ' + modulesDir).warning );
            return done();
        }
        if(exec('git clone ' + moduleRepo + ' modules/' + moduleName).code !== 0){
            console.error('there was a fatal error cloning this repository'.error);
            process.exit(1);
        }
        console.info( (moduleName + ' has been cloned in folder ' + modulesDir).success );
        done();
    };

    repeater(command, function(){
        console.log('cox has successfully run the task install'.success);
        npmCommand('install');
    });

};
