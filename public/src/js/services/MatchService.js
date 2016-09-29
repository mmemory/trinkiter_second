trinkiter.factory('MatchService', ['$http', function($http) {

    return {

        get: function() {
            return $http.get('/api/matches');
        }

    }

}]);