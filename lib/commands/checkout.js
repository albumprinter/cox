var path = require('path');
var shell = require('../shell-utils');
var repeater = require('../repeater');

module.exports = function(args, callback){
    callback = callback || function(){};
    var branch = typeof args === 'string'? args : (args.b || args._[1]);
    var isNew = !!args.b;

    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';

        console.info(('checking out branch ' + branch + ' for module: ' + moduleName).action);

        isModule && cd('modules/'+moduleName);

        var errors = shell.run('git checkout ' + (isNew? '-b ' : '') + branch);

        if(errors.legth > 0){
            console.error('something nasty went wrong here'.error);
            process.exit(1);
        }

        isModule && cd('../..');
        console.info((moduleName + ' is now working with branch ' + branch).success);
        done();
    };

    repeater(command, callback);
};


