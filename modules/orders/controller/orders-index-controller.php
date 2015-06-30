<?php 
namespace orders\controller;
use R;
return \module\define(['orders'], function($orders){

	function processEntity($input, $forceName = null) {
		$entityName = ($forceName)?$forceName:$input['_entity_name'];
		unset($input['_entity_name']);
		$entity = R::dispense($entityName);

		array_walk($input, function($value, $name) use($entity){
			//TODO Add chek input rows
			if (is_array($value)){
				if(array_key_exists('_entity_related', $value)){
					if ($value['_entity_related']['type'] === 'one_to_many'){
						$childEntityName = $value['_entity_related']['name'];
						unset($value['_entity_related']);
						//$entity->orders = array();
						foreach ($value as $key => $childInput) {
							$childEntity = processEntity($childInput, $childEntityName);
							//R::store($entity);
							//
							$entity->ownOrder[] = $childEntity;
							//$childEntity->order = $entity;
							//var_dump($childEntity);
							//R::store($childEntity);
							
							$entity->$name = json_encode($value);
							//$entity->orders[] = $childEntity;
							//var_dump($entity->ownOrder);
						}
						//TODO m.b. add some relation marker?
						
					}					
				} else {
					
				}
			} else {
				$entity->$name = $value;
			}
		});
		$id = R::store($entity);
		return $entity;
	}

	return [
		'index' => function(){
			/*return '[{"fio":"Петров Иван Васильевич", "adress":"Черкасск 23-12","index":"456332","comment":"Упакуйте в коробочку","goods":{"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg":{"imageUrl":"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg","id":"https://cs7052.vk.me/c540103/v540103350/2148e/TQEi6w5etFQ.jpg","count":"3"},"https://cs7052.vk.me/c540103/v54010396	8/1ca47/7Vouh3_Y5Gc.jpg":{"imageUrl":"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg","id":"https://cs7052.vk.me/c540103/v540103968/1ca47/7Vouh3_Y5Gc.jpg"},"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg":{"imageUrl":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","id":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg"}},"$$h33asheeKey2121":"object:14"},{"fio":"Семенова Катерина Васильевна", "adress":"Уральск ул. Мойдадыров","index":"123213","comment":"","goods":{"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg":{"imageUrl":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","id":"https://pp.vk.me/c620731/v620731968/25cc/Be17O3YKlng.jpg","count":"1"},"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg":{"imageUrl":"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg","id":"https://pp.vk.me/c314829/v314829968/a19c/LXz-zS7_qMA.jpg"}}}]';*/

			$orders = R::find('order');

			foreach ($orders as $order) {
				foreach ($order->export() as $rowName => $orderRowVal) {
					if ($data = json_decode($orderRowVal, true)){
						if(is_array($data)){
							$order->$rowName = $data;
						}
					}
				}
			}

			return json_encode(R::exportAll($orders));

		},
		'getGood' => function(){
			$imgUrl = $_GET['imgUrl'];
			$good = R::findOne('good',' image_url = ? ', 
                array( $imgUrl )
               );
			return json_encode($good->export());
		},
		'add' => function(){

			$entityData = $_POST['_entity'];

			$entity = processEntity($entityData);
			

			return json_encode($entity->export());
		}
	];
});