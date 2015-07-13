"use strict"
define(['angular'], function (ng) {
	return ["$scope", "$rootScope", "GoodsInOrder", "OrdersService",
			function($scope, $rootScope, GoodsInOrder, OrdersService){
				OrdersService.getList();
				$scope.orders = OrdersService.toPrint;
			}];
});