'use strict';
angular.module('Yeopen')
	.controller('ProfileCtrl', ['$scope', '$rootScope', 'AttachImage', 'Events',
		function($scope, $rootScope, AttachImage, Events){
                
                $scope.profile = userProfile;
                
	}])