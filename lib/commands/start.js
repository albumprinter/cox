var path = require('path');
var shell = require('../shell-utils');
var repeater = require('../repeater');
var prompt = require('../prompt-utils');

module.exports = function(args){
    var ticket = args._[1];
    console.info( ("You are about to start development for a new ticket " + ticket).warning );
    
    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';
        console.info(('preparing ' + moduleName).action);

        isModule && cd('modules/'+moduleName);

        var errors = shell.run([
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

    //[TODO]: PROMISES!!!
    require('./reset')(args, function(){
        require('./checkout')('develop', function(){
            require('./pull')(args, function(){
                args.b = ticket;
                require('./checkout')(args, function(){
                    console.info(('\n---------------------------------------------').success);
                    console.info(('you can now start working on ticket ' + ticket).success);
                    console.info(('---------------------------------------------\n').success);
                });
            });
        });
    });
};
