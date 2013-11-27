"use strict";

var fs = require('fs'),
    wrench = require('wrench'),
    async = require('async'),
    iniparser = require('iniparser'),
    logger = require('../utils/logger'),
    childprocess = require('child_process'),
    _ = require('underscore');

console.log(process.argv[1], process.argv[2]);
var destPath = process.argv[2];

var PROJECT_NAME = _.last( destPath.split('/') ),
    PROJECT_NAME_CAPS = PROJECT_NAME.charAt(0).toUpperCase() + PROJECT_NAME.slice(1),
    PROJECT_AUTHOR_NAME = '',
    PROJECT_AUTHOR_EMAIL = '',
    PROJECT_AUTHOR_SITE = '',
    PROJECT_AUTHOR_GITHUB = '';


function getGitConfig(){
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    var gitConfigFile = homeDir+'/.gitconfig';

    if( fs.existsSync( gitConfigFile ) ){
        var gitConfig = iniparser.parseSync( configFile );
        console.log( gitConfig );
        PROJECT_AUTHOR_NAME = gitConfig.name || '';
        PROJECT_AUTHOR_EMAIL = gitConfig.email || '';
        PROJECT_AUTHOR_SITE = gitConfig.site || '';
        PROJECT_AUTHOR_GITHUB = gitConfig.github || '';
    }
}

function copyTplDir(toPath, cb){
    wrench.copyDirRecursive( './tpl', toPath, function(err){
        if(err) return cb(err);

        cb(null);
    });
}


function replaceProjectStrings(filePath, cb){

    fs.readFile( filePath, 'utf8', function(err, content){
        if(err) return cb(err);

        var replacedContent = content
                                .replace(/PROJECT_NAME/, PROJECT_NAME)
                                .replace(/PROJECT_NAME_CAPS/, PROJECT_NAME_CAPS)
                                .replace(/PROJECT_AUTHOR_NAME/, PROJECT_AUTHOR_NAME)
                                .replace(/PROJECT_AUTHOR_EMAIL/,PROJECT_AUTHOR_EMAIL)
                                .replace(/PROJECT_AUTHOR_SITE/, PROJECT_AUTHOR_SITE)
                                .replace(/PROJECT_AUTHOR_GITHUB/, PROJECT_AUTHOR_GITHUB);

        fs.writeFileSync( filePath, replacedContent, 'utf8' );

        cb(null);
    });

}



copyTplDir( destPath, function(err){
    if(err) console.log(err);
    var files = wrench.readdirSyncRecursive( destPath );
    async.each( files, replaceProjectStrings, function(err, res){
        if(err) logger.error("Error replacing project strings::", err);

        else logger.info( PROJECT_NAME + " has been successfully created.");
    }); 
});


//childprocess.execFile('find', [ destPath ], function(err, stdout, stderr) {
//});
