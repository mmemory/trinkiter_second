trinkiter.directive('trMatch', [function() {

    return {
        restrict: 'E',
        templateUrl: './src/templates/match-tmpl.html',
        replace: true,
        scope: {
            match: '=matchData'
        },
        link: function(scope, elem, attrs) {


        }
    }
}]);