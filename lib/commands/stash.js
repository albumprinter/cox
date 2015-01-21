var repeater = require('../repeater');

module.exports = function(args){
    var isPop = args === 'pop' || args._[1] === 'pop';

    var command = function(moduleName, moduleRepo, done){
        console.info(((isPop? 'Popping: ' : 'Stashing: ') + moduleName).warning);
        exec('git stash' + (isPop? ' pop' : '') );
        done();
    };

    return repeater(command, 'goToModuleDir');
};
