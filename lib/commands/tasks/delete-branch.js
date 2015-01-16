var Q = require('q');

var repeater = require('../../repeater');

module.exports = function(ticket){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        console.info(('deleting branch: ' + ticket + ' for ' + moduleName).action);
        exec('git branch -D ' +  ticket);
        console.info(('deleted branch: ' + ticket + ' for ' + moduleName).success);
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);
    return deferred.promise;
};
