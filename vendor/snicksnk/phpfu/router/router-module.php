<?php 
namespace {
	return module\define(['config'], function($config){

		function getParam($index, $defaultValue, $sourceArray){
			if (array_key_exists($index, $sourceArray)){
				return $sourceArray[$index];
			} else {
				return $defaultValue;
			}
		}	

		return function($di){
			$module = getParam('module', 'welcome', $_GET);
			$controller = getParam('controller', 'index', $_GET);
			$action = getParam('action', 'index', $_GET);

			$controllerModuleName = $module.'-'.$controller.'-controller';

			if(array_key_exists($controllerModuleName, $di)){

			} else {
				throw new \Exception("Controller {$controllerModuleName} is not finded");
			}

			$currentController = module\get($di, $controllerModuleName);
		
			if (is_array($currentController)){
				if (array_key_exists($action, $currentController)){
					return $currentController[$action]();
				} else {
					throw new \Exception("Action {$action} is not founded in {$controllerModuleName} controller");
				}
			} else {
				return $currentController($action);
			}
		};
	});
}