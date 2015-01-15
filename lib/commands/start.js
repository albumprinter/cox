var path = require('path');
var shell = require('../shell-utils');
var repeater = require('../repeater');
var prompt = require('prompt');

prompt.start();
prompt.message = prompt.delimiter = '';

module.exports = function(args){
    var ticket = args._[1];
    console.info( ("You are about to start development for a new ticket " + ticket).warning );
    console.info( ("this will void all the uncommited changes in this project and every module").warning );

    prompt.get(resetPrompt, function(err, result){
        var moveForward = result.reset.match(/^y/i);
        if(moveForward){
            repeater(command, function(){

            });
        } else {
            console.info('thank you for using cox'.success);
            process.exit(0)
        }
    });
    
    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';
        console.info(('preparing ' + moduleName).action);

        isModule && cd('modules/'+moduleName);

        var errors = shell.run([
            'git reset --hard',
            'git checkout develop',
            'git pull origin develop',
            'git branch -D ' + ticket,
            'git checkout -b' + ticket
        ]);

        if(errors.legth > 0){
            console.error('somethint nasty went wrong here'.error);
            process.exit(1);
        }

        isModule && cd('../..');
        console.info((moduleName + ' is now working with branch ' + ticket + ' checked out').success);
        done();
    };
};

var resetPrompt = {
    properties: {
        reset: {
            description: 'are you sure you want to go through with this? (yes/no)'.prompt,
            required: true,
            pattern: /^(y|n|yes|no)$/i,
            message: 'please answer yes or no'
        }
    }
};
