trinkiter.controller('loginCtrl', ['$scope','LoginService',function($scope,LoginService) {

    $scope.userInfo = {};

    $scope.localAuth = function(user) {
        LoginService.localAuth(user)
            .then(function(data) {
                console.log(data);
            }, function(err) {
                console.log('Error logging in',err);
            });
    }
}]);