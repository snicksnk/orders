<?php 

return array(
	'modules-dir' => APP_ROOT.'modules',
	'modules' => array(
		'goods',
		'welcome' => [
			'action-controllers' => [
				'index'
			]
		],
		'admin' => [
			'action-controllers' => [
				'index'
			]
		],
		'orders' => [
			'action-controllers' => [
				'index'
			]
		]
	),
);