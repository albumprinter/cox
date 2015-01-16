var Q = require('q');
var shell = require('../shell-utils');
var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        console.info(('staging all unstaged files from ' + moduleName).action);
        shell.run('git add .');
        console.info(('all unstaged files were added for ' + moduleName).success);
        done();
    };

    repeater(command, 'goToModuleDir').then(deferred.resolve);
    return deferred.promise;
};


