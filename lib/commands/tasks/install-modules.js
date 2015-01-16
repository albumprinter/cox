var fs = require('fs');
var path = require('path');
var Q = require('q');
var repeater = require('../../repeater');
var shell = require('../../shell-utils');

module.exports = function(args){
    var deferred = Q.defer();
    //[TODO] check args for different module folder 
    var modulesDir = 'modules';
    var modulesPresent = ls(process.cwd()).indexOf(modulesDir) > -1;
    if(!modulesPresent){
        mkdir(modulesDir);
    }
    var installedModules = ls(modulesDir);

    var command = function(moduleName, moduleRepo, done){
        if(!moduleName){
            return done();
        }
        console.info( ('cloning ' + moduleName + ' from ' + moduleRepo).action );
        if(installedModules.indexOf(moduleName) > -1){
            console.info( (moduleName + ' is already present in folder ' + modulesDir).warning );
            return done();
        }
        if(shell.run('git clone ' + moduleRepo + ' modules/' + moduleName).errors > 0){
            console.error('there was a fatal error cloning this repository'.error);
            process.exit(1);
        }
        console.info( (moduleName + ' has been cloned in folder ' + modulesDir).success );
        done();
    };

    repeater(command).then(deferred.resolve);

    return deferred.promise;
};
