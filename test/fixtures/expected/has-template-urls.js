console.module('test', [])

    .directive('first', function() {
        return {
            restrict: 'E',
            template: '<div><h1>First Template</h1></div>',
            controler: function() {
                console.log();
            }
        };
    })

    .directive('second', second);

function second() {
    return {
        template: '<ul><li>Second</li><li>Template</li></ul>'
    };
}

function third() {
    return {
        template: '<div id="has-id" class="and-class"><h1>Third Template</h1><a href="https://github.com/devm33/gulp-ng-template-strings" id="element-with" class="more-complex-nesting">Link text</a></div>'
    };
}
