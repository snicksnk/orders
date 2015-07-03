<?php 
return module\define(['config', 'router', 'init-params'], function($config, $router, $initParams){


	$appConfig = $config();	
	$di = $initParams['di'];

	foreach ($appConfig['modules'] as $moduleNameOrIndex => $moduleNameOrConfig){

		if (is_array($moduleNameOrConfig)){
			$moduleName = $moduleNameOrIndex;
			$moduleConfig = $moduleNameOrConfig;
		} else {
			$moduleName = $moduleNameOrConfig;
			$moduleConfig = [];
		}

		if (\module\get($di, $moduleName)){
			continue;
		}

		\module\load($di, $moduleName, \module\getModuleFilePath($appConfig['modules-dir'], $moduleName));

		if (array_key_exists('action-controllers', $moduleConfig)){
			foreach ($moduleConfig['action-controllers'] as $controllerName) {
				$controllerModuleName = $moduleName.'-'.$controllerName.'-controller';
				\module\load($di, $controllerModuleName, \module\getModuleFilePath($appConfig['modules-dir'], $controllerModuleName, $moduleName));	
			}
		}		
	}


	\module\bootstrapAll($di);

	//$router = \module\get($di,'router');

	$result = $router($di);

	echo $result;

	return function() use ($appConfig){
		throw new \Exception('Application module is not callable');
	};


});	