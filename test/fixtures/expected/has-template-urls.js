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
