'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var fs = require('fs');
var NAME = 'gulp-ng-template-strings';

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function getTemplateRegex(url) {
  if (!url) {
    url = '[^"\']+'; // Url can be anything except quotes
  } else {
    url = escapeRegExp(url);
  }
  var regexStr = [
    '(["\']?)', // Optional quote around keyword, saved in group \1
    'templateUrl', // Keyword
    '\\1', // Match first quote if exists
    '\\s*:\\s*', // Colon surrounded by any whitespace (including newline)
    '(["\'])', // One quote around url, saved in \2
    '(', url, ')', // Save the url in the third group
    '\\2', // Match quote around url
  ].join('');
  return new RegExp(regexStr, 'g');
}

function findUrls(contents) {
  var templateUrls = getTemplateRegex();
  var urls = [];
  var match;
  while ((match = templateUrls.exec(contents)) !== null) {
    urls.push(match[3]);
  }
  return urls;
}

function buffer(file, cb) {
  var contents = file.contents.toString();
  var urls = findUrls(contents);
  if (urls.length === 0) {
    return cb(null, file);
  }
  urls.forEach(function(url) {
    var template;
    try {
      template = fs.readFileSync(file.base + url).toString();
    } catch (e) {
      // Do nothing when file does not exist
    }
    if (template) {
      template = template.replace(/\s*\n\s*/g, '');
      contents = contents.replace(getTemplateRegex(url),
                                  'template: \'' + template + '\'');
    }
  });
  file.contents = new Buffer(contents);
  cb(null, file);
}

function templates(file, cb) {
  if (file.isBuffer()) {
    return buffer(file, cb);
  }
  if (file.isStream()) {
    return cb(new gutil.PluginError(NAME, 'Streaming not supported'));
  }
  return cb(null, file);
}

module.exports = function() {
  return es.map(templates);
};
