trinkiter.controller('welcomeCtrl', function($scope, UserService, $state) {

    $scope.registerUser = function(user) {
        UserService.register(user)
            .then(function(data) {
                console.log(data);
            }, function(err) {
                console.log('Error registering',err);
            });
    };

    $scope.localAuth = function(user) {
        UserService.localAuth(user)
            .then(function(data) {
                console.log(data);
            }, function(err) {
                console.log('Error logging in',err);
            });
    };
});