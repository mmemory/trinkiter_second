trinkiter.factory('UserService', ['$http',function($http) {

    return {
        localAuth: function(user) {
            return $http.post('/api/users/login', user);
        },
        logout: function() {
            return $http.get('/api/users/logout');
        },
        register: function(user) {
            return $http.post('/api/users/register', user);
        },
        getCurrent: function() {
            return $http.get('/api/users/current');
        }
    }
}]);