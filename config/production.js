"use strict";

var defaultConfig = require('./default'),
    winston = require('winston'),
    _ = require('underscore');

 For NODE_ENV=production
module.exports = _.extend( defaultConfig, {
    logTransports: [
        new (winston.transports.Console)({ level: 'error' }),
        new (winston.transports.File)({ filename: '../log/testDir.log' }),
    ]

});
