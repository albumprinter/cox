var path = require('path');
var command;

try{
    command = require( path.join(__dirname, 'commands', process.argv[2]) );
} catch(ex){
    console.error('Error: there is no command ' + process.argv[2] + ' in cox');
    process.exit(1);
}


command(process.argv)
