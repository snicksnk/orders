'use strict';
angular.module('Yeopen')
.controller('FriendsApplications', function($scope, CurrentUser, FriendsApplicationService){


        $scope.service = FriendsApplicationService;
        $scope.$watch('service.list', function(list){
            $scope.list = FriendsApplicationService.list;
        });

        $scope.delay = function(id) {
            FriendsApplicationService.delay(id).success(function () {
                FriendsApplicationService.getList();
            });
        };


        $scope.remove = function(id) {
            FriendsApplicationService.delete(id).success(function () {
                FriendsApplicationService.getList();
            });
        };


        $scope.accept = function(id) {
            FriendsApplicationService.accept(id).success(function () {
                FriendsApplicationService.getList();
            });
        };

        FriendsApplicationService.getList();

});
