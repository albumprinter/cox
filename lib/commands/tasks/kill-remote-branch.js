var Q = require('q');

var repeater = require('../../repeater');

module.exports = function(ticket){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        console.info(('deleting branch ' + ticket + ' from ' + moduleName).action);
        exec('git push origin :"' + ticket + '"');
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);
    return deferred.promise;
};
