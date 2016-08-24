trinkiter.directive('trTrinkit', [function() {

    return {
        restrict: 'E',
        templateUrl: './src/templates/trinkit-tmpl.html',
        replace: true,
        scope: {
            trinkit: '=trinkitData'
        },
        link: function(scope, elem, attrs) {

            console.log(elem.parent()[0].clientWidth);

            elem.css('width', elem.parent()[0].clientWidth / 3);


        }
    }
}]);