"use strict";

var fs = require('fs'),
    commander = require('commander'),
    ncp = require('ncp').ncp,
    iniparser = require('iniparser'),
    logger = require('./utils/logger'),
    _ = require('underscore');


var destPath = process.argv[1];

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

function copyTplDir(cb){
    ncp('./tpl', process.argv[1], {}, function(err){
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
                                .replace(/PROJECT_AUTHOR_GITHUB/, PROJECT_AUTHOR_GIITHUB);

        fs.writeFileSync( filePath, replacedContent, 'utf8' );

        cb(null);
    });

}


async.each( fs.readdirSync( destPath ), replaceProjectStrings, function(err, res){
    if(err) logger.error("Error replacing project strings::", err);

    else logger.info( PROJECT_NAME + " has been successfully created.");
}); 
