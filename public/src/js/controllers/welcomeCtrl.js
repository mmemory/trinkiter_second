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
        user = {
            username: 'mmemory',
            password: '1'
        };
        UserService.localAuth(user)
            .then(function(data) {
                console.log(data);
                if(data.status === 200) $state.go('dashboard.trinkits');
            }, function(err) {
                console.log('Error logging in',err);
            });
    };
});