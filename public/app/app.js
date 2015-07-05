'use strict';
requirejs([
	'angular',
	'config/routes',
	'config/states',
	'modules/orders/scripts/orders.ctrl',
	'modules/orders/scripts/orders.svc',
	'modules/orders/scripts/goodsInOrder.svc'
	], function(ng, Routes, States, ordersCtrl, OrdersService, GoodsInOrderSvc) {
	var module = ng.module('Orders', ['ui.router', 'ui.bootstrap', /*'ngMockE2E''ui.splash'*/])
	module.constant("Routes", Routes);
	module.factory("OrdersService", OrdersService);
	module.factory('GoodsInOrder', GoodsInOrderSvc);
	module.controller("orders", ordersCtrl);
	
	return module;
});