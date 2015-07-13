'use strict';
define(["app"], function(module) {
	return {
		'main':{
			url:"",
			views: {
				"viewA":{
					controller: 'orders',
					templateUrl: 'app/modules/orders/views/orders-list.html'
				}
			}
		},
		'print':{
			url:"print",
			views: {
				"viewA":{
					controller: 'print',
					templateUrl: 'app/modules/orders/views/orders-print.html'
				}
			}
		}
	};
});