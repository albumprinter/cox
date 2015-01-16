var fs = require('fs');
var path = require('path');
var Supplant = require('supplant');

var pkg = require('../package.json');

module.exports = function(args){
	if(args.v === true){
		return console.info(("Cox - version " + pkg.version).warning)
	}
    var subs = new Supplant();
    console.log(subs.text(helpTxt, pkg));
};


var helpTxt = fs.readFileSync(path.join(__dirname, '../help.txt'), 'utf8');