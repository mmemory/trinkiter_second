trinkiter.controller('dashCtrl', ['$scope','TrinkitService',function($scope,TrinkitService, UserService) {

    $scope.matches = [
        {
            title: 'Item',
            description: 'This is a description'
        },
        {
            title: 'Item',
            description: 'This is a description'
        },
        {
            title: 'Item',
            description: 'This is a description'
        },
        {
            title: 'Item',
            description: 'This is a description'
        }
    ];

    //console.log('current user:', UserService.currentUser);

}]);