"use strict";

var assert = require('assert'),
    fs = require('fs'),
    path = require('path');

var binPath = path.resolve(__dirname, "../bin/node-boilerplate");
var libPath = path.resolve(__dirname, "../lib/node-boilerplate");
var testProjPath = path.resolve(__dirname, "./test-project");

describe('node-boilerplate', function(){
    before(function(cb){
        var cp = require('child_process').exec('rm -rf '+testProjPath, function(err, stdout){
            cb();
        }); 
    });

    afterEach(function(cb){
        var cp = require('child_process').exec('rm -rf '+testProjPath, function(err, stdout){
            cb();
        }); 
    });

    describe('generate', function(){
        
        it('can generate a boilerplate test project with default options', function(cb){
            this.timeout(10000);
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

        it('cannot generate a boilerplate test project without a path', function(cb){
            this.timeout(10000);
            var cp = require('child_process').spawn("node", [libPath]);

            var errData = "";
            cp.stderr.on('data', function(data){
                errData += errData.toString();
            });
            cp.on('close', function(code){
                assert.ok( (typeof code === "number") );
                assert.ok( code > 0 );
                cb();
            });
        });
    });
});
