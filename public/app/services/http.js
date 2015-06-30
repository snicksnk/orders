'use strict';

angular.module('Yeopen')

.service('HttpService', ['$http', '$rootScope',
    function($http, $rootScope) {

        this.httpRequest = function(route, data) {

            var preparedUrl = route.url;
            if (route.withParams && data.param)
                preparedUrl += data.param.toString()

            $http({
                method: route.method,
                url: preparedUrl,
                data: data.data
            }).success(function(data, status, headers, config) {
                if (data.length)
                    return $rootScope.$broadcast(route.eventSuccess, data);
                else
                    return $rootScope.$broadcast(route.eventError, data);
            }).error(function(data, status, headers, config) {
                return $rootScope.$broadcast(route.eventError, data);
            });
        }
    }
]);