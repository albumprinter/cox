var repeater = require('../repeater');
var prompt = require('../prompt-utils');


module.exports = function(args){

    // Cox command for:
    // 1. retrieving latest tag
    // 2. compare the latest tag with the 'master' branch
    // 3. create a new tag when diff
    // 4. push new tag to remote

    var command = function(moduleName, moduleRepo, done){

        console.log("=================================================");
        console.log("|  RUN DEPLOY COMMAND : " + moduleName);
        console.log("=================================================\n");

        var tag = "";

        /*************************************************************************
         *                             1. Latest tag                             *
         *************************************************************************/

        exec('git describe --abbrev=0 --tags', function (error, stdout, stderr) {
            if (error !== 0) {
                onError( error );
            }
            if(stdout){
                tag = normalize( stdout );
                compareDiff();
            }
            else
            {
                onError("Latest tag not found");
            }
        });

        function normalize( value ){
           return value.replace(/(\r\n|\n|\r)/gm,"");
        }

        /**************************************************************************
         *                             1. Diff                                   *
         **************************************************************************/

        function compareDiff(){
            console.log('Start compare difference with master with latest tag [ ' + tag + ' ]');
            exec('git diff master ' + tag, function (error, stdout, stderr) {

                if (error !== 0) {
                    onError( error );
                }

                if(stdout)
                {
                    createTag();
                }
                else
                {
                    console.log('No changes, Tag remains: [ ' + tag + ' ]');
                    complete();
                }
            });
        }

        /*************************************************************************
         *                             3. Create new tag                         *
         *************************************************************************/

        function createTag(){
            console.log("Start creating new tag");
            var version = updateVersion();
            console.log("New version", version);

            exec('git tag ' + version, function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( error );
                }
                complete();
            });
        }

        function updateVersion()
        {
            //expected to have format [ v3.3.1 ]
            var split = tag.split(".");
            var number = Number(split[split.length - 1]);
            var version = number + 1;
            split[split.length -1] = version;
            return split.join(".");
        }

        /*************************************************************************
         *                             4. Push tag                               *
         *************************************************************************/

        function push( version ){
            console.log("Push new tag [ " + version + " ] to remote");
            exec('git tag ' + version, function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( error );
                }
                console.log("Finished push new tag [ " + version + " ] to remote");
                complete();
            });
        }

        /*************************************************************************
         *                             Complete                                  *
         *************************************************************************/

        function complete(){
            console.log("\nFINISHED DEPLOY COMMAND : " + moduleName + "\n");
            done();
        }

        /*************************************************************************
         *                             Error                                     *
         *************************************************************************/

        function onError( error ){
            console.log("Error occured: " + error);

            console.log("\nFINISHED DEPLOY COMMAND WITH ERROR : " + moduleName + "\n");

            done();
        }

    };

    return prompt.yesNo("You are about to run deploy command for all branches".warning)
        .then(repeater.bind(null, command, 'goToModuleDir'), prompt.thankYou);
};
