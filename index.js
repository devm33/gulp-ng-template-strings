'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var fs = require('fs');

var NAME = 'gulp-ng-template-strings';

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function getRegexStr(url) {
    if(!url) {
        url = '\\S+';
    } else {
        url = escapeRegExp(url);
    }
    return '(["\']?)templateUrl\\1?\\s*:\\s*(["\'])(' + url + ')\\2';
}

function findUrls(contents) {
    var templateUrls = new RegExp(getRegexStr(), 'g');
    var urls = [];
    var match;
    while((match = templateUrls.exec(contents)) !== null) {
        urls.push(match[3]);
    }
    return urls;
}

function buffer(file, cb) {
    var contents = file.contents.toString();
    var urls = findUrls(contents);
    if(urls.length === 0) {
        return cb(null, file);
    }
    console.log('found matches', urls);
    // TODO there is 100% a better way to do this using streaming files
    urls.forEach(function(url) {
        var template;
        try {
            template = fs.readFileSync(file.base + url).toString();
        } catch(e) {
            template = e.toString();
        }
        template = template.replace(/\s*\n\s*/g, '');
        console.log('adding template', template);
        console.log('matching', getRegexStr(url));
        contents = contents.replace(getRegexStr(url), function(match) {
            console.log('match', match);
            return 'template: \'' + template + '\'';
        });
        console.log('updated contents', contents);
    });
    file.contents = new Buffer(contents);
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
