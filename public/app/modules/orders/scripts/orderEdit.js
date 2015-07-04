angular.module('Orders')

.factory('GoodsInOrder', function($rootScope, $http ,Routes){
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
			console.log(this.totalPrice);
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

})
.factory('OrdersService', function($rootScope, $http, Routes){
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


	//angular.extend(orders, AbstractService);



	angular.extend(Orders.prototype, Methods);
	var orders = new Orders(Routes.orders);
	return orders;

})
.controller('orderEdit', function($scope, $rootScope, GoodsInOrder, OrdersService){
	$scope.goodsInOrder =  {};

	$rootScope.$on('orders.goods.update', function(){
		$scope.goodsInOrder = GoodsInOrder.list;
	});

	$rootScope.$on('orders.update', function(){
		$scope.orders = OrdersService.list; 
		angular.forEach($scope.orders, function(order){
			order.id = parseInt(order.id);
		});
	});



	OrdersService.getList();

	var orderRowName;
	$scope.orderCond = "id";
	$scope.orderReverse = false;

	$scope.orderBy = function(rowName){
		
		if (orderRowName == rowName){
			$scope.orderReverse = ($scope.orderReverse)?false:true;
		}
		orderRowName = rowName;
		$scope.orderCond = orderRowName;
		console.log($scope.orderCond);
	}

	$scope.addGood = function(){
		var image = $scope.orderImage;
		$scope.orderImage = '';
		var order = {
			'imageUrl':image,
			'id':image
		}
		GoodsInOrder.add(order); 
	};

	$scope.removeGood = function(orderId){
		//delete $scope.orders[orderId];
		GoodsInOrder.remove(orderId);
	};

	function calculatePrice(goods){
		var totalPrice = 0;
		angular.forEach(goods, function(good){
			console.log('calulate',parseInt(good.price) , good.count);

			totalPrice += parseInt(good.price) * good.count;
		})
		console.log('tota; price',totalPrice);
		return totalPrice;
	}

	$scope.delete = function(id){
		OrdersService.delete(id).success(function(){
			OrdersService.getList();
		});
	}

	$scope.saveOrder = function(order){

		var orderGoods = GoodsInOrder.getCurrent();
		console.log($scope.orders);
		var orderData = {
			'fio': $scope.order['fio'],
			'adress': $scope.order['adress'],
			'index': $scope.order['index'],
			'comment': $scope.order['comment'],
			//'price': $scope.order['price'],
			'goods': orderGoods,
			'totalPrice': calculatePrice(orderGoods)
		}

		$scope.order = {};

		GoodsInOrder.reset();
		OrdersService.add(orderData);
	};
});

