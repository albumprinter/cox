var _ = require('lodash');

var cmdReset = require('./reset');
var cmdCheckout = require('./checkout');
var cmdPull = require('./pull');

module.exports = function(args){
    var ticket = args._[1];
    var branch = args._[2] || 'develop';

    console.info( ("You are about to start development for new ticket " + ticket + " from the branch " + branch).warning );

    return cmdReset(args)
        .then( cmdCheckout.bind(null, branch) )
        .then( cmdPull.bind(null, args) )
        .then( cmdCheckout.bind(null, _.merge(args, {b: ticket})) );
};
