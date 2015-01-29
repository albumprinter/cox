var installModulesCmd = require('./tasks/install-modules');
var npmCmd = require('./tasks/npm');

module.exports = function(args){
    
    return installModulesCmd(args)
        .then( npmCmd.bind(null, 'install') );
};
