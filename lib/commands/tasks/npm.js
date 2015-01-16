var path = require('path');
var Q = require('q');
var _ = require('lodash');
var shell = require('../../shell-utils');
var repeater = require('../../repeater');

module.exports = function(subCommand){
    var deferred = Q.defer();

    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';
        console.info(('cox is running npm ' + subCommand + ' for the ' + moduleName + ' module').action );
        
        var pkg = require( path.join( process.cwd(), moduleLocation, 'package.json' ) );
        var deps = _.merge(pkg.dependencies || {}, pkg.devDependencies || {});
        if(Object.keys(deps).length === 0){
            console.info((moduleName + ' has no dependencies').warning);
            return done();
        }

        isModule && cd('modules/'+moduleName);
        
        if (shell.run('npm ' + subCommand).errors > 0) {
            console.error( ('Error: npm install didn\'t run for ' + moduleName).error);
            process.exit(1);
        }
        console.info( ('successfully ran npm ' + subCommand + ' on module ' + (moduleName || 'main')).success);
        isModule && cd('../..');
        done();
    };

    repeater(command, 'goToModulesDir').then(deferred.resolve);

    return deferred.promise;
};
