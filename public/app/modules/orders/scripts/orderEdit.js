angular.module('Orders')

.factory('GoodsInOrder', function($rootScope){
	var Goods = function(){
		this.list = {};
	}

	Goods.prototype.add = function(good){
		this.list[good.id]=good;
		$rootScope.$broadcast('orders.goods.update');
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
		delete this.list[id];
		$rootScope.$broadcast('orders.goods.update');
	}
	
	return new Goods;

})
.factory('OrdersService', function($rootScope, $http, Routes){
	var Orders = function(orderRoutes){
		this.list = [];
		this.routes = orderRoutes;
	}

	var Methods = {
		getList: function(){
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
	});



	OrdersService.getList();


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

	$scope.saveOrder = function(order){
		console.log($scope.orders);
		var orderData = {
			'fio': $scope.order['fio'],
			'adress': $scope.order['adress'],
			'index': $scope.order['index'],
			'comment': $scope.order['comment'],
			'price': $scope.order['price'],
			'goods': GoodsInOrder.getCurrent()
		}

		$scope.order = {};

		GoodsInOrder.reset();
		OrdersService.add(orderData);
	};
});

