"use strict";

var config = require('../config/' + (process.env.NODE_ENV || 'development')),
    winston = require('winston');

module.exports = new (winston.Logger)({
    transports: config.loggerTransports
});
