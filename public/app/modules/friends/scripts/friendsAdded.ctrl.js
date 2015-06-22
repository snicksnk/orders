'use strict';
angular.module('Yeopen')
.controller('FriendsAdded', function($scope, CurrentUser, FriendsAddedService){


        $scope.getShortList = function(id) {
            FriendsAddedService.getShortList(id).success(function (res) {
				$scope.data = res;
            });
        };
		

		$scope.getShortList();

});
