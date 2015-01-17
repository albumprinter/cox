var repeater = require('../repeater');

module.exports = function(args){

    var command = function(moduleName, moduleRepo, done){
        console.info(('pulling: ' + moduleName).action);
        exec('git pull');
        console.info(('pulled latest changes for ' + moduleName).success);
        done();
    };

    return repeater(command, 'goToModuleDir');
};


