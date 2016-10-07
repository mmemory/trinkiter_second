trinkiter.controller('accountCtrl', ['$scope','UserService','TrinkitService',function($scope,UserService,TrinkitService) {

    TrinkitService.getUserTrinkits($scope.currentUser._id)
        .then(function(data) {
            $scope.trinkits = data.data
        }, function(err) {
            console.log('Error getting trinkits',err);
        });
}]);