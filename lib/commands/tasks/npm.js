var path = require('path');
var _ = require('lodash');
var repeater = require('../../repeater');

module.exports = function(subCommand){

    var command = function(moduleName, moduleRepo, done){
        console.info(('cox is running npm ' + subCommand + ' for the ' + moduleName + ' module').action );
        
        var pkg = require( path.join( process.cwd(), 'package.json' ) );
        var deps = _.merge(pkg.dependencies || {}, pkg.devDependencies || {});
        if(Object.keys(deps).length === 0){
            console.info((moduleName + ' has no dependencies').warning);
            return done();
        }
        
        exec('npm ' + subCommand);
        console.info( ('successfully ran npm ' + subCommand + ' on module ' + moduleName).success);
        done();
    };

    return repeater(command, 'goToModulesDir');
};
