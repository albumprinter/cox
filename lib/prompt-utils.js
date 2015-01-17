var Q = require('q');
var prompt = require('prompt');
prompt.message = prompt.delimiter = '';
prompt.start();

module.exports = {
    yesNo: function(question, callback){
        var deferred = Q.defer();
        console.info(question);
        prompt.get(yesNo, function(err, result){
            if(result.reset.match(/^y/i)){
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }
};

module.exports.thankYou = function(){
    console.info('thank you for using cox'.success);
    process.exit(0);
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
