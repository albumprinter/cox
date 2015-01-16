var path = require('path');
var Q = require('q');

var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        console.info(('Status of module: ' + moduleName).warning);
        exec('git status');
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);

    return deferred.promise;
};
