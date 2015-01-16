var Q = require('q');
var prompt = require('prompt');
prompt.message = prompt.delimiter = '';
prompt.start();

module.exports = {
    yesNo: function(question, callback){
        var deferred = Q.defer();
        console.info(question);
        prompt.get(yesNo, function(err, result){
            deferred.resolve(result.reset.match(/^y/i));
        });
        return deferred.promise;
    }
};


var yesNo = {
    properties: {
        reset: {
            description: 'are you sure you want to go through with this? (yes/no)'.prompt,
            required: true,
            pattern: /^(y|n|yes|no)$/i,
            message: 'please answer yes or no'
        }
    }
};
