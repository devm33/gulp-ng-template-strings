'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');

var NAME = 'gulp-ng-template-strings';

function findUrls(contents) {
    var templateUrls = /(["']?)templateUrl\1?\s*:\s*(["'])(\S+)\2/g;
    var urls = [];
    var match;
    while((match = templateUrls.exec(contents)) !== null) {
        urls.push(match[3]);
    }
    console.log('found matches', urls);
    return urls;
}

function buffer(file, cb) {
    var contents = file.contents.toString();
    var urls = findUrls(contents);
    if(urls.length === 0) {
        return cb(null, file);
    }
    // TODO
    file.contents = new Buffer(contents.replace('templateUrl', 'template'));
    cb(null, file);
}

function templates(file, cb) {
    if(file.isBuffer()) {
        return buffer(file, cb);
    }
    if(file.isStream()) {
        return cb(new gutil.PluginError(NAME, 'Streaming not supported'));
    }
    return cb(null, file);
}

module.exports = function() {
    return es.map(templates);
};
