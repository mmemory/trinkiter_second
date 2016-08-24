trinkiter.controller('loginCtrl', ['$scope','UserService',function($scope,UserService) {

    $scope.userInfo = {};

    $scope.localAuth = function(user) {
        UserService.localAuth(user)
            .then(function(data) {
                console.log(data);
            }, function(err) {
                console.log('Error logging in',err);
            });
    };

    $scope.registerUser = function(user) {
        UserService.register(user)
            .then(function(data) {
                console.log(data);
            }, function(err) {
                console.log('Error registering',err);
            });
    }
}]);