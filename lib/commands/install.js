var Q = require('q');

var installModulesCmd = require('./tasks/install-modules');
var npmCmd = require('./tasks/npm');

module.exports = function(args){
    var deferred = Q.defer();
    
    installModulesCmd(args)
        .then( npmCmd.bind(null, 'install') )
        .then(deferred.resolve);

    return deferred.promise;
};
