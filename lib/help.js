var fs = require('fs');
var path = require('path');

var pkg = require('../package.json');

module.exports = function(args){
	if(args.v === true){
		return console.info(("Cox - version " + pkg.version).warning)
	}
    console.log( helpTxt.replace('{{version}}', pkg.version) );
};


var helpTxt = fs.readFileSync(path.join(__dirname, '../help.txt'), 'utf8');
