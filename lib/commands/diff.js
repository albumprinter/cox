var path = require('path');
var shell = require('../shell-utils');
var Q = require('q');
var repeater = require('../repeater');

module.exports = function(args){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';

        console.info(('Diff of module: ' + moduleName).success);

        isModule && cd('modules/'+moduleName);

        var response = exec('git diff');


        isModule && cd('../..');
        done();
    };

    repeater(command).then(deferred.resolve);

    return deferred.promise;
};
