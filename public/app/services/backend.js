'use strict';

angular.module('Yeopen')

.factory('BackendService', ['$http', function($http){
    /*
    return function(route, data) {
       $http({
            method: route.method,
            url: route.url,
            data: data
        }).error(function(data, status, headers, config) {
            console.log('dddd errrrrooorr');    
        });

        return $http;
    };*/

    
    return $http;

}]);