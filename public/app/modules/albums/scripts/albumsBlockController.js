'use strict';

angular.module('Yeopen')


	.controller("AlbumsBlockController", ['$scope', '$rootScope', '$stateParams', 
		'AlbumsService',
	    function($scope, $rootScope, $routeParams, AlbumsService )
	    {
	    	$scope.list = AlbumsService.list;
	        $scope.albumService = AlbumsService;
	        $scope.$watch('albumService.list', function(list){
	            $scope.list = AlbumsService.list;
	        });
		}]);