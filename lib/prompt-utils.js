var prompt = require('prompt');
prompt.message = prompt.delimiter = '';
prompt.start();

module.exports = {
    yesNo: function(question, callback){
        console.info(question);
        prompt.get(yesNo, function(err, result){console.log(result);
            callback(result.reset.match(/^y/i));
        });
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
