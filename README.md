# gulp-ng-template-strings
> Inline angular templates into directive definition objects

[![Build Status](https://travis-ci.org/devm33/gulp-ng-template-strings.svg?branch=master)](https://travis-ci.org/devm33/gulp-ng-template-strings)
[![Coverage Status](https://coveralls.io/repos/devm33/gulp-ng-template-strings/badge.svg?branch=master&service=github)](https://coveralls.io/github/devm33/gulp-ng-template-strings?branch=master)
[![npm version](https://badge.fury.io/js/gulp-ng-template-strings.svg)](http://badge.fury.io/js/gulp-ng-template-strings)

[Install](#install) | [Example](#example) | [API](#api)

## Install

```
npm i --save-dev gulp-ng-template-strings
```

## Example

Pass the plugin js files containing `templateUrl` properties to have them
replaced with `template` properties.

`gulpfile.js`

```js
var gulp = require('gulp');
var ngTemplateStrings = require('gulp-ng-template-strings');

gulp.task('default', function() {
  return gulp.src('src/**/*.js')
    .pipe(ngTemplateStrings())
    .pipe(gulp.dest('dist'));
});
```

**Input files**

`src/tab.js`

```js
function tabDirective() {
    return {
        templateUrl: 'templates/tab.html'
    };
}
```

`templates/tab.html`

```html
<ul>
    <li>Tab</li>
</ul>
```

**Output file**

`dist/tab.js`

```js
function tabDirective() {
    return {
        templateUrl: '<ul><li>Tab</li></ul>'
    };
}
```

## API

All options can be passed on stream creation.

```js
ngTemplateStrings(options)
```

### `cwd`

By default the plugin looks for files based of the `file.cwd` of each file
passed through. This option overrides that for all files passed to a stream.

```js
ngTemplateStrings({cwd: 'root/of/templatesUrls/'})
```

### `minify`

Your html strings will be minified with
[html-minifier](https://github.com/kangax/html-minifier). You can override our
default configuration by passing a minify object in the settings object.

```js
ngTemplateStrings({minify: {collapseWhitespace: false}})
```

By default we use the following options:

```js
removeComments: true, // remove html comments
removeCommentsFromCDATA: true, // removes comments from inline JS & CSS
collapseWhitespace: true, // collapse whitespace in text nodes
caseSensitive: true // preserve case in attributes
// all other options use html-minifier's default, false.
```

You can also disable minification altogether by passing:

```js
ngTemplateStrings({minify: false})
```
