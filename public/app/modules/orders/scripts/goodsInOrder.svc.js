"use strict"
define([], function () {
	return ["$rootScope", "$http","Routes",
			function($rootScope, $http ,Routes){
				var Goods = function(routes){
					this.list = {};
					this.routes = routes;
					this.totalPrice = 0;
				}

				Goods.prototype.add = function(good){
					var that = this;
					if (typeof good.count == 'undefined'){
						good.count = 1;
					} 
					$http(this.routes.getByImageUrl(good.imageUrl)).success(function(data){
						good.price = data.price;
						that.list[good.id]=good;
						delete good.id;
						$rootScope.$broadcast('orders.goods.update');
					});

				}

				Goods.prototype.getCurrent = function(){
					var list = this.list;
					this.list = {};
					return list;
				}

				Goods.prototype.reset = function(){
					this.list = {};
					$rootScope.$broadcast('orders.goods.update');
				}

				Goods.prototype.remove = function(id){
					this.totalPrice += this.list[id].price;
					delete this.list[id];
					$rootScope.$broadcast('orders.goods.update');
				}
				
				return new Goods(Routes.goods);

	}]
});