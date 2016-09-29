trinkiter.controller('dashCtrl', ['$scope','TrinkitService','UserService',function($scope,TrinkitService,UserService) {

    UserService.getCurrent()
        .then(function(user) {
            $scope.currentUser = user.data.userInfo;
        }, function(err) {
            console.log('Error getting current user', err);
        });

    TrinkitService.get()
        .then(function(trinkits) {
            $scope.trinkits = trinkits.data;
        }, function(err) {
            console.log('Error getting trinkits',err);
        });

    $scope.createTrinkit = function(trinkit) {
        TrinkitService.create(trinkit)
            .then(function(trinkit) {
                console.log(trinkit);
            }, function(err) {
                console.log('Error creating trinkit', err);
            })
    }
}]);