var path = require('path');
var Q = require('q');
var shell = require('../shell-utils');
var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';

        console.info(('Status of module: ' + moduleName).warning);

        isModule && cd('modules/'+moduleName);

        exec('git status');

        isModule && cd('../..');
        done();
    };

    repeater(command).then(deferred.resolve);

    return deferred.promise;
};
