var path = require('path');

var Q = require('q');
var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        console.info(('Diff of module: ' + moduleName).success);
        var response = exec('git diff');
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);

    return deferred.promise;
};
