trinkiter.controller('dashCtrl', ['$scope','TrinkitService','UserService','$state',function($scope,TrinkitService,UserService,$state) {

    UserService.getCurrent()
        .then(function(user) {
            $scope.currentUser = user.data;
            console.log($scope.currentUser);
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
            });
    };

    $scope.logout = function() {
        UserService.logout()
            .then(function(data) {
                console.log(data);
                if(data.status === 200) $state.go('welcome')
            }, function(err) {
                console.log(err);
            });
    };

    $scope.likeTrinkit = function(trinkit) {
        console.log('fired!');
        TrinkitService.like(trinkit)
            .then(function(data) {
                var i = $scope.trinkits.indexOf(trinkit);
                $scope.trinkits.splice(i, 1);
                console.log(data);
            }, function(err) {
                console.log('Error liking trinkit', err);
            });
    };

    $scope.flag = false;
    $scope.toggleFlag = function() {
        $scope.flag = !$scope.flag;
    }
}]);