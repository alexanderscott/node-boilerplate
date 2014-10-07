"use strict";
 
/**
 * Grunt build & test helpers
 */
module.exports = function(grunt){
 
    grunt.initConfig({
        jsdoc: {
            dist: {
                src: ['lib/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        jshint: {
            all: ['lib/*.js', 'test/*tests.js', 'test/*Tests.js'],
            lib: ['lib/*.js'],
            options: {
                jshintrc: true
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 20000,
                    require: 'test/coverage'
                },
                src: ['test/*tests.js', 'test/*Tests.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    // use the quiet flag to suppress the mocha console output
                    quiet: true,
                    // specify a destination file to capture the mocha
                    // output (the quiet option does not suppress this)
                    captureFile: 'doc/coverage.html'
                },
                src: ['test/*tests.js', 'test/*Tests.js']
            }
        }
 
    });
 
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
 
    grunt.registerTask('default', ['jsdoc', 'jshint:all', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('doc', ['jsdoc']);
    grunt.registerTask('hint', ['jshint']);
 
};

