var path = require('path');
var repeater = require('../repeater');
var prompt = require('../prompt-utils');

module.exports = function(args, force){
    var ticket = args._[1];
    var deferred = Q.defer();
    
    var command = function(moduleName, moduleRepo, done){
        console.info(('resetting ' + moduleName).action);
        exec('git reset --hard');
        console.info((moduleName + ' has reset to HEAD').success);
        done();
    };

    if(force){
        return repeater(command, 'goToModuleDir');
    }

    return prompt.yesNo("this will void all the uncommited changes in this project and every module".warning)
        .then(repeater.bind(null, command, 'goToModuleDir'), prompt.thankYou);
};
