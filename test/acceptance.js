var assert = require('assert'),
    fs = require('fs'),
    nodeBoilerplate = require('../lib/node-boilerplate');


describe('node-boilerplate', function(){
    before(function(cb){
        cb();
    });

    beforeEach(function(cb){
        cb();
    });

    afterEach(function(cb){
        if( ! fs.existsDirSync('./test-project') ) {
            fs.removeDirSync('./test-project');
        }
        cb();
    });

    after(function(cb){
        cb();
    });

    describe('generate', function(){
        
        it('can generate a boilerplate test project with default options', function(cb){
            var cp = require('child_process').spawn('node', ['../lib/node-boilerplate', './test-project']);

            cp.on('err', cb);
            cp.on('end', function(){
                assert.ok( fs.existsDirSync('./test-project') );
                assert.ok( fs.existsFileSync('./test-project/package.json') );
                assert.ok( fs.existsFileSync('./test-project/lib/test-project.js') );
                var testPackage = require('./test/project/package.json');
                assert.ok( testPackage.name === 'test-project' );

            });

        });

        it('cannot generate a boilerplate project without a path or project name', function(cb){
            assert.throws( function(){
                var cp = require('child_process').spawn('node', ['../lib/node-boilerplate']);

            }, Error);
        });

    });


});
