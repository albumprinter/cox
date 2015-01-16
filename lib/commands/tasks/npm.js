var path = require('path');
var Q = require('q');
var _ = require('lodash');
var shell = require('../../shell-utils');
var repeater = require('../../repeater');

module.exports = function(subCommand){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        console.info(('cox is running npm ' + subCommand + ' for the ' + moduleName + ' module').action );
        
        var pkg = require( path.join( process.cwd(), 'package.json' ) );
        var deps = _.merge(pkg.dependencies || {}, pkg.devDependencies || {});
        if(Object.keys(deps).length === 0){
            console.info((moduleName + ' has no dependencies').warning);
            return done();
        }
        
        shell.run('npm ' + subCommand);
        console.info( ('successfully ran npm ' + subCommand + ' on module ' + moduleName).success);
        done();
    };

    repeater(command, 'goToModulesDir').then(deferred.resolve);

    return deferred.promise;
};