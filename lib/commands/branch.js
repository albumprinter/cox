var repeater = require('../repeater');
var nodegit = require('nodegit');

module.exports = function(args){
    var branch = args[3];

    var command = function(){

    };

    repeater(command, function(){
        console.log('commands completed');
    })

};
