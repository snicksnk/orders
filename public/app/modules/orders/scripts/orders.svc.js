"use strict"
define(['angular'], function (ng) {
	return (["$rootScope", "$http",	"Routes",
			function($rootScope, $http, Routes){
				var Orders = function(orderRoutes){
					this.list = [];
					this.routes = orderRoutes;
				}

				var Methods = {
					getList: function(search){
						var that = this;
						$http(this.routes.list()).success(function(data){
							that.list = data;
							$rootScope.$broadcast('orders.update');
						});
					},
					add: function(order){
						var that = this;
						$http(this.routes.add(order)).success(function(newOrder){
							that.list.push(newOrder);
							$rootScope.$broadcast('orders.update');
						});
					},
					search: function(params){
						$http(this.routes.search(order)).success(function(newOrder){
							that.list = data;
							$rootScope.$broadcast('orders.update');
						});
					},
					delete: function(id){
						return $http(this.routes.delete(id)).success(function(result){
							$rootScope.$broadcast('orders.update');
						});
					}
				}


				ng.extend(Orders.prototype, Methods);
				var orders = new Orders(Routes.orders);
				return orders;

			}]);
});
