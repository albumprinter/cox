var repeater = require('../repeater');

module.exports = function(args){
    var branch = args._[1] || '';

    var command = function(moduleName, moduleRepo, done){
        console.info(('pulling: ' + moduleName).action);
        exec('git pull origin ' + branch);
        console.info(('pulled latest changes for ' + moduleName).success);
        done();
    };

    return repeater(command, 'goToModuleDir');
};


