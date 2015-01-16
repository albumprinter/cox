var path = require('path');
var shell = require('../shell-utils');
var Q = require('q');
var _ = require('lodash');
var repeater = require('../repeater');
var prompt = require('../prompt-utils');

var cmdReset = require('./reset');
var cmdCheckout = require('./checkout');
var cmdPull = require('./pull');

module.exports = function(args){
    var deferred = Q.defer();
    var ticket = args._[1];
    console.info( ("You are about to start development for a new ticket " + ticket).warning );

    cmdReset(args)
        .then( cmdCheckout.bind(null, 'develop') )
        .then( cmdPull.bind(null, args) )
        .then( cmdCheckout.bind(null, _.merge(args, {b: ticket})) )
        .then( deferred.resolve );

    return deferred.promise;
};
