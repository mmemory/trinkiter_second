trinkiter.filter('hideUserTrinkits', function() {
    
    return function(items, currentUser) {
        var returnArray = [];
        if(items) {
            angular.forEach(items, function(item) {
                if(item.creator !== currentUser._id && currentUser.trinkitHideList.indexOf(item._id) < 0)returnArray.push(item);
            });
            return returnArray;
        }
    }
});