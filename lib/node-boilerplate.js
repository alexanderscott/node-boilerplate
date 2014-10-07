"use strict";

var fs = require('fs'),
    path = require('path'),
    wrench = require('wrench'),
    async = require('async'),
    iniparser = require('iniparser'),
    logger = require('../utils/logger'),
    childprocess = require('child_process'),
    _ = require('underscore');

var destPath = (process.argv[0] === 'node' ? process.argv[2] : process.argv[1]);

var PROJECT_NAME = _.last( destPath.split('/') ),
    PROJECT_NAME_CAPS = PROJECT_NAME.charAt(0).toUpperCase() + PROJECT_NAME.slice(1),
    PROJECT_AUTHOR_NAME = '',
    PROJECT_AUTHOR_EMAIL = '',
    PROJECT_AUTHOR_SITE = '',
    PROJECT_AUTHOR_GITHUB = '',
    PROJECT_DESCRIPTION = '';


function getGitConfig(){
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    var gitConfigFile = homeDir+'/.gitconfig';

    if( fs.existsSync( gitConfigFile ) ){
        console.log("Parsing ~/.gitconfig...");
        var gitConfig = iniparser.parseSync( gitConfigFile );
        PROJECT_AUTHOR_NAME = (_.isObject(gitConfig.user) && _.isString(gitConfig.user.name)) ? gitConfig.user.name : '';
        PROJECT_AUTHOR_EMAIL = (_.isObject(gitConfig.user) && _.isString(gitConfig.user.email)) ? gitConfig.user.email : '';
        PROJECT_AUTHOR_SITE = (_.isObject(gitConfig.user) && _.isString(gitConfig.user.site)) ? gitConfig.user.site : '';
        PROJECT_AUTHOR_GITHUB = (_.isObject(gitConfig.github) && _.isString(gitConfig.github.user)) ? gitConfig.github.user : '';
    }
}

function copyTplDir(toPath, cb){
    wrench.copyDirRecursive( path.resolve(__dirname, '../tpl'), toPath, function(err){
        if(err) return cb(err);
        cb(null);
    });
}


function replaceProjectStrings(filePath, cb){

    var fsStats = fs.statSync(filePath);
    if(fsStats.isFile() && !fsStats.isDirectory()){
        fs.readFile( filePath, 'utf8', function(err, content){
            if(err) {
                console.log("Error reading file: ", filePath);
                return cb(null);
                //return cb(err);
            }

            var replacedContent = content
                                    .replace(/PROJECT_NAME/g, PROJECT_NAME)
                                    .replace(/PROJECT_NAME_CAPS/g, PROJECT_NAME_CAPS)
                                    .replace(/PROJECT_AUTHOR_NAME/g, PROJECT_AUTHOR_NAME)
                                    .replace(/PROJECT_AUTHOR_EMAIL/g, PROJECT_AUTHOR_EMAIL)
                                    .replace(/PROJECT_DESCRIPTION/g, PROJECT_DESCRIPTION)
                                    .replace(/PROJECT_AUTHOR_SITE/g, PROJECT_AUTHOR_SITE)
                                    .replace(/PROJECT_AUTHOR_GITHUB/g, PROJECT_AUTHOR_GITHUB);

            var outputFilePath = filePath;
            fs.writeFileSync( outputFilePath, replacedContent, 'utf8' );
            if( filePath.match(/PROJECT_NAME/g) ) {
                outputFilePath = filePath.replace(/PROJECT_NAME/, PROJECT_NAME, "g");
                fs.renameSync( filePath, outputFilePath, 'utf8' );
            }

            console.log("Created file: "+outputFilePath);
            cb(null);
        });
    } else {
        // Path could be a directory...
        //console.log("Could not replace strings from: " + filePath);
        cb(null);
    }

}


copyTplDir( destPath, function(err){
    if(err) console.log(err);

    var files = wrench.readdirSyncRecursive( destPath );
    for(var i = 0; i < files.length; i++){
        files[i] = path.resolve(destPath, "./"+files[i]);
    }

    getGitConfig();

    async.each( files, replaceProjectStrings, function(err, res){
        if(err) console.log("Error replacing project strings::", err);

        else console.info("Project: "+ PROJECT_NAME + " has been successfully created by node-boilerplate.");
        process.exit(0);
    }); 
});

