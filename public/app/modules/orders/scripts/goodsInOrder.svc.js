"use strict"
define(['underscore'], function (_) {
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

				Goods.prototype.setCurrent = function(list){
					this.list = {};
					var that = this;
					_.map(list, function(good){
						console.log(that);
						good.id = good.imageUrl;
						that.list[good.imageUrl] = good; 
					});
					$rootScope.$broadcast('orders.goods.update');
				}

				Goods.prototype.reset = function(){
					this.list = {};
					$rootScope.$broadcast('orders.goods.update');
				}

				Goods.prototype.remove = function(id){
					console.log(id);
					this.totalPrice += this.list[id].price;
					delete this.list[id];
					$rootScope.$broadcast('orders.goods.update');
				}
				
				return new Goods(Routes.goods);

	}]
});