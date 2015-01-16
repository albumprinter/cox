var path = require('path');

module.exports = function(args){
	var commandName = args._[0];
	// try{
	    command = require( path.join(__dirname, 'commands', commandName ) );
	// } catch(ex){
	//     console.error(('Error: there is no command ' + commandName + ' in cox').error);
	//     console.error(('run "cox -h" for help').error);
	//     process.exit(1);
	// }

	command(args).then(function(){
		console.info(('\n-------------------------------------------').success);
		console.info(('cox has run the task - '+commandName+' - successfully').success);
		console.info(('-------------------------------------------\n').success);
	});
};