var path = require('path');
var repeater = require('../repeater');

module.exports = function(args){

    var command = function(moduleName, moduleRepo, done){
        console.info(('Diff of module: ' + moduleName).success);
        var response = exec('git diff');
        done();
    };

    return repeater(command, 'goToModuleDir');
};
