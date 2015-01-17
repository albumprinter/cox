var repeater = require('../repeater');

module.exports = function(args){
    var branch = args._[1]; console.log(branch);

    var command = function(moduleName, moduleRepo, done){
        console.info(('pushing to ' + moduleName).action);
        exec('git push origin "' + branch + '"');
        console.info(('all changes were pushed ' + moduleName).success);
        done();
    };

    return repeater(command, 'goToModuleDir');
};
