var fs = require('fs');
var path = require('path');
var Q = require('q');

var modulesDir = 'modules';
var projectName = process.cwd().split('/').pop();

try{
    var pkg = require( path.join(process.cwd(), 'package.json') );
    var dependencies = pkg.coxDependencies;
    if(typeof dependencies !== 'object'){
        console.error('Error: no coxDependencies in package.json'.error);
        process.exit(1);
    }
} catch(ex){
    console.error('Error: not in a project folder - missing package.json'.error);
    process.exit(1);
}


var repeater = module.exports = function(command, goToModuleDir){
    var deferred = Q.defer();
    var modules = Object.keys(dependencies);

    command(projectName, pkg.repository.url, repeat);

    function repeat(){
        var moduleName = modules.shift();
        if(!moduleName){
            return deferred.resolve();
        }
        var moduleRepo = dependencies[moduleName];
        goToModuleDir && cd( path.join(modulesDir, moduleName) );
        command(moduleName, moduleRepo, function(){
            goToModuleDir && cd( '../../' );
            repeat();
        });
    };

    return deferred.promise;
};

