# gulp-ng-template-strings
> Inline angular templates into directive definition objects

[![Build Status](https://travis-ci.org/devm33/gulp-ng-template-strings.svg?branch=master)](https://travis-ci.org/devm33/gulp-ng-template-strings)
[![Coverage Status](https://coveralls.io/repos/devm33/gulp-ng-template-strings/badge.svg?branch=master&service=github)](https://coveralls.io/github/devm33/gulp-ng-template-strings?branch=master)
[![npm version](https://badge.fury.io/js/gulp-ng-template-strings.svg)](http://badge.fury.io/js/gulp-ng-template-strings)

[![NPM](https://nodei.co/npm/gulp-ng-template-strings.png)](https://nodei.co/npm/gulp-ng-template-strings/)

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
