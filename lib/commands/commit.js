var Q = require('q');

var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();
    var message = args._[1];

    var command = function(moduleName, moduleRepo, done){
        console.info(('staging all unstaged files from ' + moduleName).action);
        exec('git commit -m "' + message + '"');
        console.info(('all changes were committed for ' + moduleName).success);
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);
    return deferred.promise;
};
