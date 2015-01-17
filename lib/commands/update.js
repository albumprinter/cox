var npmCmd = require('./tasks/npm');

module.exports = function(args){
    return npmCmd('update');
};
