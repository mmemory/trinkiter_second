trinkiter.factory('LoginService', ['$http',function($http) {

    return {
        localAuth: function(user) {
            return $http.post('/api/users/login', user);
        },
        logout: function() {
            return $http.get('/api/users/logout');
        }
    }
}]);