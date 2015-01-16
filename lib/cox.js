var shelljs = require('shelljs/global');
var parseArgs = require('minimist');
require('colors').setTheme(require('./colors-theme'));

var args = parseArgs(process.argv.slice(2));

if(args.h === true || args.v === true){
	require('./help')(args);
} else {
	require('./execute')(args);
}


