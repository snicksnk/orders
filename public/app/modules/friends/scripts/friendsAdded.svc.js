'use strict';
angular.module('Yeopen')
    .factory('FriendsAddedService', function(AbstractService, Events, Routes, $http ){

        var addedService = new AbstractService(Routes.friendsAdded);

        var Methods = {
            getShortList: function(applicationId) {
                return this.createMethod('list')(applicationId);
            }
        };
        angular.extend(addedService, Methods);

        return addedService;
    })
