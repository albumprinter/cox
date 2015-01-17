var repeater = require('../repeater');

module.exports = function(args){

    var command = function(moduleName, moduleRepo, done){
        console.info(('staging all unstaged files from ' + moduleName).action);
        exec('git add .');
        console.info(('all unstaged files were added for ' + moduleName).success);
        done();
    };

    return repeater(command, 'goToModuleDir');
};


