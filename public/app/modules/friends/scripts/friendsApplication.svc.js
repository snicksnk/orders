'use strict';
angular.module('Yeopen')
    .factory('FriendsApplicationService', function(AbstractService, Events, Routes, $http ){


        var applicationsService = new AbstractService(Routes.friendsApplication);

        var Methods = {
            accept: function(applicationId) {
                return this.createMethod('accept')(applicationId);
            },
            delay: function(applicationId) {
                return this.createMethod('delay')(applicationId);
            }
        };
        angular.extend(applicationsService, Methods);



        return applicationsService;
    })
