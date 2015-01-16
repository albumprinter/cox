var path = require('path');
var shell = require('../shell-utils');
var Q = require('q');
var repeater = require('../repeater');
var prompt = require('../prompt-utils');

module.exports = function(args){
    var ticket = args._[1];
    var deferred = Q.defer();
    
    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';

        console.info(('resetting ' + moduleName).action);

        isModule && cd('modules/'+moduleName);

        var errors = shell.run('git reset --hard');

        if(errors.legth > 0){
            console.error('somethint nasty went wrong here'.error);
            process.exit(1);
        }

        isModule && cd('../..');
        console.info((moduleName + ' has reset to HEAD').success);
        done();
    };

    var question = "this will void all the uncommited changes in this project and every module";

    prompt.yesNo(question.warning).then(function(yes){
        if(!yes){
            console.info('thank you for using cox'.success);
            process.exit(0);
        }
        repeater(command).then(deferred.resolve);
    });

    return deferred.promise;
};


