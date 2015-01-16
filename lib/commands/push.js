var Q = require('q');

var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();
    var branch = args._[1]; console.log(branch);

    var command = function(moduleName, moduleRepo, done){
        console.info(('pushing to ' + moduleName).action);
        exec('git push origin "' + branch + '"');
        console.info(('all changes were pushed ' + moduleName).success);
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);
    return deferred.promise;
};
