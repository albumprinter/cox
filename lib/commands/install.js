var path = require('path');
var rmdir = require('rimraf');
var NodeGit = require('nodegit');
var clone = NodeGit.Clone.clone;
var repeater = require('../repeater');
var nodegitOptions = require('../nodegitoptions');
var npmInstall = require('./npminstall');

var modulesDir = 'modules';

module.exports = function(args){
    //[TODO] check args for different module folder 
    var command = function(moduleName, moduleRepo, done){
        console.info( ('cloning ' + moduleName + ' from ' + moduleRepo).action );
        var options = nodegitOptions.get();
        clone(moduleRepo, 'modules/' + moduleName, options).then(function(){
            console.info( (moduleName + ' has been cloned in folder ' + modulesDir).success );
            done();
        }, function(err){
            console.error(err);
            process.exit(1);
        });
    };

    rmdir( path.join(process.cwd(), modulesDir), function(err){
        if(err){
            return console.log(err.error);
            process.exit(1);
        }

        repeater(command, function(){
            console.log('cox has successfully run the task install'.success);
            console.log('starting NPM Install'.action);
            npmInstall();
        });
    });

};
