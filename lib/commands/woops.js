var cmdStash = require('./stash');
var cmdCheckout = require('./checkout');

module.exports = function(args){
    var ticket = args._[1];
    console.info( ("You are about to start development for new ticket " + ticket).warning );

    return cmdStash(args)
        .then( cmdCheckout.bind(null, args) )
        .then( cmdStash.bind(null, 'pop') );
};
