var path = require('path');
var shell = require('../shell-utils');
var repeater = require('../repeater');

module.exports = function(args, callback){
    callback = callback || function(){};

    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';

        console.info(('Status of module: ' + moduleName).success);

        isModule && cd('modules/'+moduleName);

        var response = exec('git status');


        isModule && cd('../..');
        done();
    };

    repeater(command, callback);
};
