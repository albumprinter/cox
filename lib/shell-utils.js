module.exports = {
    run: function(commands){
        commands = Array.isArray(commands)? commands : [commands];
        var results = [];
        commands.forEach(function(command){
            results.push( exec(command, silent) );
        });

        return results.filter(function(res){
            return res.code !== 0;
        });
    }
};


var silent = {silent: true};
