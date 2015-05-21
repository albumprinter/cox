var repeater = require('../repeater');
var prompt = require('../prompt-utils');
var path = require('path');
var fs = require('fs');
var Q = require('q');

module.exports = function(args){

    // Cox command:
    // 1. retrieving latest tag
    // 2. compare the latest tag with the 'master' branch
    // 3. create a new tag when diff
    // 4. push new tag to remote git
    // 5. update package.json

    // Finally: Update Project
    // A. update package.json file in project folder
    // B. create tag and push to remote

    var projectName = process.cwd().split('/').pop();
    var tagCreate = false;
    var pushTag = false;

    var baseBranch = args._[1] || "master";

    var packagePath = path.join( process.cwd(), 'package.json' );
    var packageData = require( packagePath );
    var packageChanged = false;

    var command = function(moduleName, moduleRepo, done){

        console.log("=================================================");
        console.log("|  RUN DEPLOY COMMAND : " + moduleName + " " + moduleRepo);
        console.log("=================================================\n");

        var tag = "";

        /*************************************************************************
         *                             1. Latest tag                             *
         *************************************************************************/

        console.log("\n1. Retrieve Latest Tag for [ " + moduleName+ " ]");
            //TODO: should check for the latest remote tag! currently checking the local tags...
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
                    if( projectName === moduleName)
                    {
                        packageChanged = true;
                        updatePackage( tag );
                    }
                    else if(tagCreate){
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
                    packageChanged = true;
                }
                else
                {
                    if(repoSplit[1] !== version)
                    {
                        repoSplit[1] = '#' + version;
                        packageData.coxDependencies[ moduleName ] = repoSplit.join("");
                        packageChanged = true;
                    }

                }
                console.log("Updated repository version [ " + packageData.coxDependencies[ moduleName ] + " ]");
                complete();
            }
            else if(moduleName === projectName){
                console.log("Update version of the project [ " + projectName + " ] modules changed: "+ packageChanged);

                if(packageData[ "version" ] !== version )
                {
                    //update version of the Project for diff
                    packageData[ "version" ] = version;
                    packageChanged = true;
                }
                else if( packageChanged )
                {
                    //update version of the Project for modules changes
                    packageData[ "version" ] = updateVersion(version);
                    packageChanged = true;
                }
                updateProject();
            }
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

        /*************************************************************************
         *                        Update Project : package json                  *
         *************************************************************************/

        var updateProject = function(){

            console.log("=================================================");
            console.log("|  UPDATE PROJECT : " + projectName + " changed=" + packageChanged );
            console.log("=================================================\n");

            if( packageChanged )
            {
                var result = JSON.stringify(packageData, null, "\t");
                fs.writeFile(packagePath, result, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("Project changed package.json updated : " + packagePath );
                    commitProject();
                });
            }
            else
            {
                console.log("Project has not changed." );
                complete();
            }

        }
        /*************************************************************************
         *                      Create Project Tag and Push                      *
         *************************************************************************/

        var commitProject = function(){
            prompt.yesNo("Do you also want to commit/push changes for this project [ " + projectName + " ] [ " + packageData[ "version" ] + " ] ?".warning)
                .then(gitAddChange)
                .then(gitCommitChange)
                .then(gitPushChange)
                .then(gitTagChange)
                .then(gitPushTagChange)
                .then(complete)
        }


        var gitAddChange = function(){
            var deferred = Q.defer();

            console.log("Start: add change");

            exec('git add . ', function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( "add " + error );
                }
                deferred.resolve({});
                console.log("Resolved: add change\n");

            });
            return deferred.promise;
        }

        var gitCommitChange = function(){
            var deferred = Q.defer();

            console.log("Start: commit change");

            var projectVersion = packageData[ "version" ];
            exec('git commit -m ' + '"Update for new tag version [ ' + projectVersion + ' ]"', function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( "commit " + error );
                }
                deferred.resolve({});
                console.log("Resolved: commit change\n");
            });

            return deferred.promise;

        }

        var gitPushChange = function(){
            var deferred = Q.defer();

            console.log("Start: git push branch");

            exec('git push origin ' + baseBranch, function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( "push origin " + error );
                }
                deferred.resolve({});
                console.log("Resolved: git push branch\n");
            });
            return deferred.promise;

        }

        var gitTagChange = function(){
            var deferred = Q.defer();

            console.log("Start: git tag");

            var projectVersion = packageData[ "version" ];
            // create tag
            exec('git tag ' + projectVersion, function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( "git tag " + error );
                }
                deferred.resolve({});
                console.log("Resolved: git tag\n");

            });
            return deferred.promise;

        }

        var gitPushTagChange = function(){
            var deferred = Q.defer();

            console.log("Start: push tag");

            var projectVersion = packageData[ "version" ];
            exec('git push origin ' + projectVersion, function (error, stdout, stderr) {
                if (error !== 0) {
                    onError( "git push origin " + error );
                }
                deferred.resolve({});
                console.log("Resolved: push tag\n");
            });
            return deferred.promise;

        }
    };

    /*************************************************************************
     *                      START : prompt                                   *
     *************************************************************************/

    return prompt.yesNo("You are about to run deploy command for all branches [ " + baseBranch + " ]".warning)
        .then(repeater.bind(null, command, 'goToModuleDir', false, true), prompt.thankYou)
};
