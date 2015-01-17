var path = require('path');
var repeater = require('../repeater');

module.exports = function(args){
    var branch = typeof args === 'string'? args : (args.b || args._[1]);
    var isNew = !!args.b;

    var command = function(moduleName, moduleRepo, done){
        console.info(('checking out branch ' + branch + ' for module: ' + moduleName).action);
        exec('git checkout ' + (isNew? '-b ' : '') + branch);
        console.info((moduleName + ' is now working with branch ' + branch).success);
        done();
    };

    return repeater(command, 'goToModuleDir');
};


