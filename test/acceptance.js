"use strict";

var assert = require('assert'),
    fs = require('fs'),
    path = require('path');
    //nodeBoilerplate = require('../lib/node-boilerplate');


describe('node-boilerplate', function(){
    before(function(cb){
        cb();
    });

    beforeEach(function(cb){
        cb();
    });

    afterEach(function(cb){
        cb();
    });

    after(function(cb){
        cb();
    });

    describe('generate', function(){
        
        it('can generate a boilerplate test project with default options', function(cb){
            this.timeout(10000);
            var binPath = path.resolve(__dirname, "../bin/node-boilerplate");
            var libPath = path.resolve(__dirname, "../lib/node-boilerplate");
            var testProjPath = path.resolve(__dirname, "./test-project");
            var cp = require('child_process').spawn("node", [libPath, testProjPath]);

            cp.on('close', function(){
                assert.ok( fs.existsSync( path.resolve(__dirname, './test-project') ));
                assert.ok( fs.existsSync(path.resolve(__dirname, './test-project/package.json') ));
                assert.ok( fs.existsSync( path.resolve(__dirname, './test-project/lib/test-project.js') ));
                var testPackage = require( path.resolve(__dirname, './test-project/package.json'));
                assert.ok( testPackage.name === 'test-project' );
                cb();
            });

        });
    });
});
