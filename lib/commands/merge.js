var repeater = require('../repeater');
var prompt = require('../prompt-utils');

module.exports = function(args, force){
    var branch = args._[1] || '';

    var command = function(moduleName, moduleRepo, done){
        console.info(('start merge ' + branch + ' into ' + moduleName).action);
        exec('git merge "' + branch + '"');
        console.info(('finished merged ' + branch + ' into ' + moduleName).success);
        done();
    };

    if(force){
        return repeater(command, 'goToModuleDir');
    }

    return prompt.yesNo("this will merge branch [ " + branch + " ] into all modules".warning)
        .then(repeater.bind(null, command, 'goToModuleDir'), prompt.thankYou);
};
