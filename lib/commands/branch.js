var repeater = require('../repeater');

module.exports = function(args){
    var branch = args[3];

    var command = 'git checkout -b ' + branch;

    repeater(command, function(){
        console.log('commands completed');
    })

};
