"use strict";

var defaultConfig = require('./default'),
    winston = require('winston'),
    _ = require('underscore');

//// For NODE_ENV=development
module.exports = _.extend( defaultConfig, {
    logTransports: [
        new (winston.transports.Console)({ level: 'debug' }),
    ]

});
