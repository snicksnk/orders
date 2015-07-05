"use strict"
define([], function () {
	return ["$scope", "$rootScope", "GoodsInOrder", "OrdersService",
			function($scope, $rootScope, GoodsInOrder, OrdersService){

				$scope.goodsInOrder =  {};
				OrdersService.getList();

				$rootScope.$on('orders.goods.update', function(){
					$scope.goodsInOrder = GoodsInOrder.list;
				});

				$rootScope.$on('orders.update', function(){
					$scope.orders = OrdersService.list; 
					angular.forEach($scope.orders, function(order){
						order.id = parseInt(order.id);
					});
				});



				var orderRowName;
				$scope.orderCond = "id";
				$scope.orderReverse = false;

				$scope.orderBy = function(rowName){
					
					if (orderRowName == rowName){
						$scope.orderReverse = ($scope.orderReverse)?false:true;
					}
					orderRowName = rowName;
					$scope.orderCond = orderRowName;
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
						totalPrice += parseInt(good.price) * good.count;
					});
					return totalPrice;
				}

				$scope.delete = function(id){
					OrdersService.delete(id).success(function(){
						OrdersService.getList();
					});
				}

				$scope.saveOrder = function(order){

					var orderGoods = GoodsInOrder.getCurrent();
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
			}];
});