var shelljs = require('shelljs/global');
var path = require('path');
var parseArgs = require('minimist');
require('colors').setTheme(require('./colors-theme'));
var command;

var args = parseArgs(process.argv.slice(2));
var commandName = args._[0];

// try{
    command = require( path.join(__dirname, 'commands', commandName ) );
// } catch(ex){
//     console.error(('Error: there is no command ' + commandName + ' in cox').error);
//     process.exit(1);
// }

command(args);


