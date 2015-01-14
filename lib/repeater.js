var fs = require('fs');
var path = require('path');

try{
    var pkg = require( path.join(process.cwd(), 'package.json') );
    var dependencies = pkg.oetDependencies;
    if(typeof dependencies !== 'object'){
        console.error('Error: no coxDependencies in package.json');
        process.exit(1);
    }
} catch(ex){
    console.error('Error: not in a project folder - missing package.json');
    process.exit(1);
}


var repeater = module.exports = function(command, callback){
    var modules = Object.keys(dependencies);

    (function traverse(){
        var moduleName = modules.shift();
        if(!moduleName){
            return callback();
        }
        var moduleRepo = dependencies[moduleName];
        command(moduleName, moduleRepo, traverse);
    })();

};

