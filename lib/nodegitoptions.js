var NodeGit = require('nodegit');
var _ = require('lodash');

var options = {
    ignoreCertErrors: 1,
    remoteCallbacks: {
        credentials: function(url, userName) {
            var creds = NodeGit.Cred.sshKeyFromAgent(userName);
            return creds;
        }
    }
};

module.exports = {
    get: function(){
        return _.cloneDeep(options);
    }
};
