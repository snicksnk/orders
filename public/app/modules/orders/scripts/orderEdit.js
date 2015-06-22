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
.factory('OrdersService', function($rootScope, GoodsInOrder){
	var Orders = function(){
		this.list = [];
	}

	var Methods = {
		getList: function(){
			this.list = JSON.parse('[{"fio":"Петров Иван Васильевич", "adress":"Черкасск 23-12","index":"456332","comment":"Упакуйте в коробочку","goods":{"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg":{"imageUrl":"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg","id":"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg","count":"3"},"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg":{"imageUrl":"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg","id":"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg"},"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg":{"imageUrl":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","id":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg"}},"$$h33asheeKey2121":"object:14"},{"fio":"Семенова Катерина Васильевна", "adress":"Уральск ул. Мойдадыров","index":"123213","comment":"","goods":{"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg":{"imageUrl":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","id":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","count":"1"},"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg":{"imageUrl":"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg","id":"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg"}}}]');
			$rootScope.$broadcast('orders.update');
		},
		add: function(order){
			this.list.push(order);
			console.log(JSON.stringify(this.list));
			$rootScope.$broadcast('orders.update');
		},
	}


	//angular.extend(orders, AbstractService);



	angular.extend(Orders.prototype, Methods);
	var orders = new Orders;
	return orders;

})
.controller('orderEdit', function($scope, $rootScope, GoodsInOrder, OrdersService){
	$scope.goodsInOrder =  {};

	$rootScope.$on('orders.goods.update', function(){
		$scope.goodsInOrder = GoodsInOrder.list;
	});

	$rootScope.$on('orders.update', function(){
		console.log(OrdersService.list);
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

	$scope.saveOrder = function(){
		console.log($scope.order['fio']);
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

