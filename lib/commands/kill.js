var path = require('path');
var Q = require('q');
var prompt = require('../prompt-utils');

var resetCmd = require('./reset');
var checkoutCmd = require('./checkout');
var deleteBranchCmd = require('./tasks/delete-branch.js');
var killRemoteBranchCmd = require('./tasks/kill-remote-branch.js');

module.exports = function(args){
    var ticket = args._[1];
    var deferred = Q.defer();

    prompt.yesNo( ("this will void all the uncommited changes in the current branch and delete the branch " + ticket).warning)
        .then(function(yes){
            if(!yes){
                console.info('thank you for using cox'.success);
                process.exit(0);
            }

            resetCmd(args, 'force')
                .then( checkoutCmd.bind(null, 'develop') )
                .then( deleteBranchCmd.bind(null, ticket) )
                .then( killRemoteBranchCmd.bind(null, ticket) )
                .then( deferred.resolve );
        });

    return deferred.promise;
};


