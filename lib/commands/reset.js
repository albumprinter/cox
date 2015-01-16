var path = require('path');
var shell = require('../shell-utils');
var Q = require('q');
var repeater = require('../repeater');
var prompt = require('../prompt-utils');

module.exports = function(args, force){
    var ticket = args._[1];
    var deferred = Q.defer();
    
    var command = function(moduleName, moduleRepo, done){
        console.info(('resetting ' + moduleName).action);
        shell.run('git reset --hard');
        console.info((moduleName + ' has reset to HEAD').success);
        done();
    };

    if(force){
        repeater(command, 'goToModuleDir').then(deferred.resolve);
    }

    force || prompt.yesNo("this will void all the uncommited changes in this project and every module".warning)
        .then(function(yes){
            if(!yes){
                console.info('thank you for using cox'.success);
                process.exit(0);
            }
            repeater(command, 'goToModuleDir').then(deferred.resolve);
        });

    return deferred.promise;
};


