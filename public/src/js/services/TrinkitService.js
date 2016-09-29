trinkiter.factory('TrinkitService', ['$http','$q',function($http,$q) {

    return {
        get: function() {
            return $http.get('/api/trinkits');
        },
        create: function(item) {
            return $http.post('/api/trinkits', item);
        }
    }
}]);