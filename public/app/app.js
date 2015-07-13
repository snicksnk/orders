'use strict';
define([
	'angular',
	'config/routes',
	'config/states',
	'modules/orders/scripts/orders.ctrl',
	'modules/orders/scripts/orders.svc',
	'modules/orders/scripts/goodsInOrder.svc',

	'modules/orders/scripts/print-order.ctrl',
	], function(ng, Routes, States, ordersCtrl, OrdersService, GoodsInOrderSvc, printCtrl) {
	var module = ng.module('Orders', ['ui.router', 'ui.bootstrap', /*'ngMockE2E''ui.splash'*/])
	module.constant("Routes", Routes);
	module.factory("OrdersService", OrdersService);
	module.factory('GoodsInOrder', GoodsInOrderSvc);
	module.controller("orders", ordersCtrl);
	module.controller("print", printCtrl);

	module.config(function($stateProvider){
		console.log(States);
		angular.forEach(States, function(config, name){
			$stateProvider.state(name, config);
		});
	});

	return module;
});