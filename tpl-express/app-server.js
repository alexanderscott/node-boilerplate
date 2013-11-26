"use strict";

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require("path"),
    config = require('./config/' + (process.env.NODE_ENV || 'development'),
    logger = global.logger = require('./utils/logger'),

    app = express(),
    server;



// Allow node to be run with proxy passing
app.enable('trust proxy');

// Logging config
app.configure('local', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});

// Compression (gzip)
app.use( express.compress() );
app.use( express.methodOverride() );
app.use( express.bodyParser() );            // Needed to parse POST data sent as JSON payload

// Setup routes
//app.use( require('./app/routes') );

function start(){
    server = http.createServer(app).listen( config.port );
    logger.info((new Date()).toString()+ ":: PROJECT_NAME server listening on port::", config.port, ", environment:: ", app.settings.env);
}

exports.start = start;
exports.app = app;
