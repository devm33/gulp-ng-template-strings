var angular = {};
angular.module('test', []).directive('directive', directive);

function directive() {
    return {
        restrict: 'E',
        scope: {},
        template: 'should not change'
    };
}
