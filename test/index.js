'use strict';
var File = require('vinyl');
var assert = require('assert');
var cwd = process.cwd() + '/test/fixtures';
var fs = require('fs');
var templates = require('../');
var vfs = require('vinyl-fs');

describe('gulp-ng-template-strings', function() {
    it('should inline template contents into js file', function(done) {
        vfs.src('has-template-urls.js', {cwd:cwd})
            .pipe(templates())
            .on('data', function(file) {
                assert.equal(
                    file.contents.toString('utf8'),
                    fs.readFileSync(cwd + '/expected/has-template-urls.js', 'utf8'));
                done();
            });
    });

    it('should pass js without template urls through unchanged', function(done) {
        var path = 'no-template-urls.js';
        vfs.src(path, {cwd:cwd})
            .pipe(templates())
            .on('data', function(file) {
                assert.equal(
                    file.contents.toString('utf8'),
                    fs.readFileSync(cwd + '/' + path, 'utf8'));
                done();
            });
    });

    it('should leave url in place when file does not exist', function(done) {
        var contents = 'templateUrl: "file/does/not/exist"';
        templates()
            .on('data', function(file) {
                assert.equal(file.contents.toString(), contents);
                done();
            })
            .write(new File({contents: new Buffer(contents)}));
    });

    it('should emit an error when input is streaming', function(done) {
        templates()
            .on('error', function(err) {
                assert(err);
                done();
            })
            .write(new File({
                contents: fs.createReadStream(cwd + '/has-template-urls.js')
            }));
    });
});
