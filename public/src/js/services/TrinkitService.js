trinkiter.factory('TrinkitService', ['$http','$q',function($http,$q) {

    return {
        get: function() {
            return $http.get('/api/trinkits');
        },
        create: function(item) {
            return $http.post('/api/trinkits', item);
        },
        getUserTrinkits: function(id) {
            return $http.get('/api/trinkits/' + id)
        },
        like: function(trinkit) {
            return $http.post('/api/trinkits/like/'+trinkit._id);
        }
    }
}]);