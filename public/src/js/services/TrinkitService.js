trinkiter.factory('TrinkitService', ['$http',function($http) {

    return {
        get: function() {
            return $http.get('/api/trinkits');
        },
        create: function(item) {
            return $http.post('/api/trinkits', item);
        }
    }
}]);