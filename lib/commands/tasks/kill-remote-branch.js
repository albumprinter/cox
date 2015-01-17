var repeater = require('../../repeater');

module.exports = function(ticket){

    var command = function(moduleName, moduleRepo, done){
        console.info(('deleting branch ' + ticket + ' from ' + moduleName).action);
        exec('git push origin :"' + ticket + '"');
        done();
    };

    return repeater(command, 'goToModuleDir');
};
