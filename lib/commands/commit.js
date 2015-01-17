var repeater = require('../repeater');

module.exports = function(args){
    var message = args._[1];

    var command = function(moduleName, moduleRepo, done){
        console.info(('staging all unstaged files from ' + moduleName).action);
        exec('git commit -m "' + message + '"');
        console.info(('all changes were committed for ' + moduleName).success);
        done();
    };

    return repeater(command, 'goToModuleDir');
};
