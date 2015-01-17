var path = require('path');
var repeater = require('../repeater');

module.exports = function(args){

    var command = function(moduleName, moduleRepo, done){
        console.info(('Status of module: ' + moduleName).warning);
        exec('git status');
        done();
    };

    return repeater(command, 'goToModuleDir');
};
