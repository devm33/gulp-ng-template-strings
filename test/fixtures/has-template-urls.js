console.module('test', [])

    .directive('first', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/first.html',
            controler: function() {
                console.log();
            }
        };
    })

    .directive('second', second);

function second() {
    return {
        'templateUrl': "templates/second.html"
    };
}

function third() {
    return {
        'templateUrl': "templates/third.html"
    };
}
