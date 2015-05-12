var path = require('path');
var repeater = require('../repeater');
var prompt = require('../prompt-utils');

module.exports = function(args, force){

    var del = args._[1] === 'delete' ? ' -d' : '';
    var tagArguments = args._.slice( del ? 2 : 1 ).join(" ");

    var gitCommand = 'git tag' + del + (tagArguments ? ' ' + tagArguments : '');

    var command = function(moduleName, moduleRepo, done){

        console.info(("Start [ " + gitCommand + " ] for " + moduleName).action);
        exec( gitCommand );
        console.info(("Finished [ " + gitCommand + " ] for " + moduleName).action);
        done();
    };

    if(!tagArguments){
        force = true;
    }
    if(force){
        return repeater(command, 'goToModuleDir');
    }

    return prompt.yesNo("You are about to run [ " + gitCommand + " ] for all branches".warning)
        .then(repeater.bind(null, command, 'goToModuleDir'), prompt.thankYou);
};