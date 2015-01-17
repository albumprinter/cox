var _ = require('lodash');

var cmdReset = require('./reset');
var cmdCheckout = require('./checkout');
var cmdPull = require('./pull');

module.exports = function(args){
    var ticket = args._[1];
    console.info( ("You are about to start development for new ticket " + ticket).warning );

    return cmdReset(args)
        .then( cmdCheckout.bind(null, 'develop') )
        .then( cmdPull.bind(null, args) )
        .then( cmdCheckout.bind(null, _.merge(args, {b: ticket})) );
};
