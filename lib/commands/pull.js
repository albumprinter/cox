var Q = require('q');
var shell = require('../shell-utils');
var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        console.info(('pulling: ' + moduleName).action);
        shell.run('git pull');
        console.info(('pulled latest changes for ' + moduleName).success);
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);
    return deferred.promise;
};


