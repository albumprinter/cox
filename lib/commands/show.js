var path = require('path');
var repeater = require('../repeater');

module.exports = function(args, force){
    var version = args._[1] || '';
    
    var command = function(moduleName, moduleRepo, done){
        console.info(('Tag [ ' + version + ' ]  for ' + moduleName + ":").action );
        exec('git show ' + version);
        done();
    };

    return repeater(command, 'goToModuleDir');
};