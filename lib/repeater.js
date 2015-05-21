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


var repeater = module.exports = function(command, goToModuleDir, skipMainProject, mainProjectAtEnd){
    var deferred = Q.defer();
    var modules = Object.keys(dependencies);

    if(skipMainProject){
        repeat();
    } else {
        if(mainProjectAtEnd)
        {
            // run as last in chain.
            modules.push(projectName);
            repeat();
        }
        else
        {
            // run as first command
            command(projectName, pkg.repository.url, repeat);

        }
    }

    function repeat(){
        var moduleName = modules.shift();
        if(!moduleName){
            return deferred.resolve();
        }
        var moduleRepo = dependencies[moduleName];
        if(moduleName === projectName)
        {
            moduleRepo = pkg.repository.url;
        }
        goToModuleDir && cd( path.join(modulesDir, moduleName) );
        command(moduleName, moduleRepo, function(){
            goToModuleDir && cd( '../../' );
            repeat();
        });
    };

    return deferred.promise;
};

