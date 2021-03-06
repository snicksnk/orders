"use strict"
define(['angular', 'underscore'], function (ng, _) {
	return (["$rootScope", "$http",	"Routes",
			function($rootScope, $http, Routes){
				var Orders = function(orderRoutes){
					this.list = [];
					this.routes = orderRoutes;
					this.statuses = [
						"Получен",
						"Не подтвержден",
						"Готов к распечатке",
						"Распечатан",
						"Собран и отправлен",
						"Возврат",
						"Повторный заказ",
						"Не хватило комплекта",
						"Подтвержден",
						"Ждем предоплату",
						"Получили предоплату",
						"Cобрать и отправить",
						"Дозаказывает"
					];
					this.toPrint = {};
				}

				var Methods = {
					getList: function(search){
						var that = this;
						$http(this.routes.list()).success(function(data){
							that.list = data;
							$rootScope.$broadcast('orders.update');
						});
					},
					getWithId: function(orderId){
						var order = _.find(this.list, function(order){
							if (order.id == orderId){
								return true
							}
						});
						return order;
					},
					add: function(order){
						var orderId = order['id'];
						var that = this;
						$http(this.routes.add(order)).success(function(newOrder){
							if(orderId){
								var order = that.getWithId(orderId);
								angular.forEach(order, function(value, row){
									order[row] = newOrder[row];
								});
							} else {
								that.list.push(newOrder);
							}
							$rootScope.$broadcast('orders.update');
						});
					},
					addToPrint: function(orderId){
						this.toPrint[orderId] = this.getWithId(orderId);

					},
					deleteFromPrint: function(orderId){
						delete this.toPrint[orderId];
					},
					isPrinted: function(orderId){
						return (typeof this.toPrint[orderId] !== "undefined")?true:false;
					},
					getPrinted: function(){
						return this.toPrint;
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
