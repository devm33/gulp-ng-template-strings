'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');

var NAME = 'gulp-ng-template-strings';

module.exports = function() {


    function buffer(file, cb) {
        if(file.isNull()) {
            return cb(null, file);
        }
        if(file.isStream()) {
            return cb(new gutil.PluginError(NAME, 'Streaming not supported'));
        }

        console.log(file.contents.toString());
        // TODO
        return cb(null, file);
    }

    return es.map(buffer);
};
