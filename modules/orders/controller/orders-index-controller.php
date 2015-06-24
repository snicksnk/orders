<?php 
return \module\define(['orders'], function($orders){

	return [
		'index' => function(){
			/*return '[{"fio":"Петров Иван Васильевич", "adress":"Черкасск 23-12","index":"456332","comment":"Упакуйте в коробочку","goods":{"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg":{"imageUrl":"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg","id":"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg","count":"3"},"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg":{"imageUrl":"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg","id":"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg"},"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg":{"imageUrl":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","id":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg"}},"$$h33asheeKey2121":"object:14"},{"fio":"Семенова Катерина Васильевна", "adress":"Уральск ул. Мойдадыров","index":"123213","comment":"","goods":{"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg":{"imageUrl":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","id":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","count":"1"},"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg":{"imageUrl":"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg","id":"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg"}}}]';*/

			$orders = R::find('order');
			return json_encode(R::exportAll($orders));

		},
		'add' => function(){
			$order = R::dispense('order');
			if ($_POST['order']['goods']){
				$_POST['order']['goods'] = json_encode($_POST['order']['goods']);
			}
			array_walk($_POST['order'], function($value, $name) use($order){
				//TODO Add chek input rows
				$order->$name = $value;
			});
			R::store($order);

			if ($_POST['order']['goods']){
				$order->goods = json_decode($order->goods);
			}
			return json_encode($order->export());
		}
	];
});