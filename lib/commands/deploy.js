var repeater = require('../repeater');
var prompt = require('../prompt-utils');
var path = require('path');
var fs = require('fs');

module.exports = function(args){

    // Cox command:
    // 1. retrieving latest tag
    // 2. compare the latest tag with the 'master' branch
    // 3. create a new tag when diff
    // 4. push new tag to remote git
    // 5. update package.json

    // Finally:
    // A. update package.json file in project folder
    // B. commit
    // C. push

    var projectName = process.cwd().split('/').pop();
    var tagCreate = false;
    var pushTag = false;

    var baseBranch = args._[1] || "master";

    var packagePath = path.join( process.cwd(), 'package.json' );
    var packageData = require( packagePath );

    var command = function(moduleName, moduleRepo, done){

        console.log("=================================================");
        console.log("|  RUN DEPLOY COMMAND : " + moduleName + " " + moduleRepo);
        console.log("=================================================\n");

        var tag = "";

        /*************************************************************************
         *                             1. Latest tag                             *
         *************************************************************************/

        console.log("\n1. Retrieve Latest Tag for [ " + moduleName+ " ]");
            //TODO: should check for the latest remote tag!
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
            //remove unnecesarry linebreaks
            return value.replace(/(\r\n|\n|\r)/gm,"");
        }

        /**************************************************************************
         *                             2. Diff                                   *
         **************************************************************************/

        function compareDiff(){
            console.log('\n2. Start compare difference with [ ' + baseBranch + ' ] for the latest tag [ ' + tag + ' ]');
            exec('git diff ' + baseBranch + ' ' + tag, function (error, stdout, stderr) {

                if (error !== 0) {
                    onError( error );
                }

                if(stdout)
                {
                    if(tagCreate){
                        createTag();
                    }
                    else{
                        updatePackage( tag );
                    }
                }
                else
                {
                    console.log('No changes, Tag remains: [ ' + tag + ' ]');
                    console.log("Module [ " + packageData.coxDependencies[ moduleName ] + " ]");
                    updatePackage( tag );
                }
            });
        }

        /*************************************************************************
         *                             3. Create new tag                         *
         *************************************************************************/

        function createTag(){
            console.log("\n3. Start creating new tag");
            var version = updateVersion();
            console.log("New version", version);

            exec('git tag ' + version, function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( error );
                }

                // push tag directly to git
                if(pushTag){
                    push( version );
                }
                else{
                    updatePackage( version );
                }

            });
        }

        // update version, bump up the 'jam' version
        function updateVersion()
        {
            //expected to have format [ 3.3.1 ]
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
            console.log("\n4. Push new tag [ " + version + " ] to remote");
            //TODO: git push 'tag' command
            exec('git push origin ' + version, function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( error );
                }
                console.log("Finished push new tag [ " + version + " ] to remote");
                updatePackage( version );
            });
        }

        /*************************************************************************
         *                    5. Update version in package.json                  *
         *************************************************************************/

        function updatePackage( version ){
            console.log("\n5. Update version in package.json [ " + version + " ] ");
            var repo = packageData.coxDependencies[ moduleName ];
            if(repo)
            {
                console.log("Repo [ " + repo + " ]");

                var repoSplit = repo.split("#");
                if(repoSplit.length == 1)
                {
                    packageData.coxDependencies[ moduleName ] = repo + '#' + version;
                }
                else
                {
                    repoSplit[1] = '#' + version;
                    packageData.coxDependencies[ moduleName ] = repoSplit.join("");

                }
                console.log("Updated repository version [ " + packageData.coxDependencies[ moduleName ] + " ]");
            }
            else if(moduleName === projectName){
                console.log("Update version of the project [ " + projectName + " ]");
                packageData[ "version" ] = version;
            }
            complete();
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

    /*************************************************************************
     *                        Update the package.json                        *
     *************************************************************************/

    var replacePackage = function(moduleName, moduleRepo, done){

        var result = JSON.stringify(packageData, null, "\t");
        var outputPath = packagePath;

        fs.writeFile(outputPath, result, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("DONE: The file was saved to " + outputPath );
        });

        //TODO:
//        prompt.yesNo("Do you also want to commit/push this?".warning)
//            .then(commitPackageJson)
//            .then(pushPackageJson);
    }

    return prompt.yesNo("You are about to run deploy command for all branches [ " + baseBranch + " ]".warning)
        .then(repeater.bind(null, command, 'goToModuleDir', false, true), prompt.thankYou)
        .then(replacePackage);
};
