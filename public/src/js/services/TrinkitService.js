trinkiter.factory('TrinkitService', ['$http','$q',function($http,$q) {

    return {
        get: function() {
            return $http.get('/api/trinkits');
        },
        create: function(item) {
            return $http.post('/api/trinkits', item);
        },
        getCards: function() {
            var dfd = $q.defer();
            $http.get('http://deckofcardsapi.com/api/deck/new/')
                .then(function(data) {
                    dfd.resolve(data.data);
                }, function(err) {
                    dfd.reject(err);
                });
            return dfd.promise;
        }
    }
}]);