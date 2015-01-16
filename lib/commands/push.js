var Q = require('q');
var shell = require('../shell-utils');
var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();
    var branch = args._[1]; console.log(branch);

    var command = function(moduleName, moduleRepo, done){
        console.info(('pushing to ' + moduleName).action);
        shell.run('git push origin "' + branch + '"');
        console.info(('all changes were pushed ' + moduleName).success);
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);
    return deferred.promise;
};
