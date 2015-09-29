console.module('test', [])

    .directive('first', function() {
        return {
            restrict: 'E',
            templateUrl: '<div><h1>First Template</h1></div>',
            controler: function() {
                console.log();
            }
        };
    })

    .directive('second', second);

function second() {
    return {
        'templateUrl': '<ul><li>Second</li><li>Template</li></ul>'
    };
}
