var fs = require('fs');
var path = require('path');
var modulesPath = path.join( process.cwd(), 'modules' );

module.exports = function(commands, callback){
    commands = Array.isArray(commands)? commands : [commands];
    commands.forEach(function(command, idx){
        console.log('command', idx, command);
    });
}

var modules = [];
var files = fs.readdirSync(modulesPath);
files.forEach(function(file){
    var fullPath = path.join(modulesPath, file);
    var stat = fs.statSync( fullPath );
    if(stat.isDirectory()){
        modules.push(fullPath);
    }
});

console.log(modules);
