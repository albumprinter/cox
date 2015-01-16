var Q = require('q');

var npmCmd = require('./tasks/npm');

module.exports = function(args){
    var deferred = Q.defer();
    
    npmCmd('update').then(deferred.resolve);

    return deferred.promise;
};