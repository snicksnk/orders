<?php
namespace module{

	/**
	* TODO Add Lazy loading
	*/
	function load(&$di, $name, $path, $initParams = [])  {
		$di[$name] = [
			'name' => $name,
			'path' => $path,
			'definition' => null,
			'module' => null,
			'isInited' => false,
			'_initParams' => $initParams
		];
	}

	function addInitedModule(&$di, $name, $module, $initParams = []) {
		$di[$name] = [
			'name' => $name,
			'path' => null,
			'definition' => null,
			'module' => $module,
			'isInited' => true,
			'_initParams' => $initParams
		];
	}

	function addModulesDefinition(&$di, $name, $definition) {
		$di[$name] = [
			'name' => $name,
			'path' => null,
			'definition' => $definition,
			'module' => null,
			'isInited' => true,
			'_initParams' => []
		];
	}

	function removeModule(&$di, $name) {
		$di[$name] = null;
	}



	function define($moduleDependencies, $moduleDefinition){

		$definer =  function ($di, $initParams) use ($moduleDependencies, $moduleDefinition) {
			$dependencies = [];


			foreach ($moduleDependencies as $dependencieName) {

				if (!array_key_exists($dependencieName, $di) && $dependencieName !== 'init-params'){
					throw new \Exception("Module {$dependencieName} is not defined");
				}

				bootsrap($di, $di[$dependencieName]);
				if ($dependencieName !== 'init-params'){
					$dependencies[] = $di[$dependencieName]['module'];
				}

			}
			if (!is_callable($moduleDefinition)){
				throw new \Exception("Can't init module.");
			}

			if ($initParams){
				addInitedModule($di, 'init-params', $initParams);
				$dependencies[] = $di['init-params']['module'];
			}
	
			$module = call_user_func_array($moduleDefinition, $dependencies);
			
			if ($initParams){
				removeModule($di, 'init-params');
			}

			return $module;
		};

		return $definer;
	}

	function bootstrapAll(&$di, $initParamsArray = []) {
		foreach ($di as &$moduleData) {
			//TODO Implement init params
			bootsrap($di, $moduleData);
		}

	}

	function bootsrap($di, &$moduleData, $initParams = []){

		$included = get_included_files();

		if ($moduleData['isInited'] === false){
			$pathToModule = $moduleData['path'];
			if (in_array(realpath($pathToModule), $included)){

				throw new \Exception("File {$pathToModule} already included");
			}
			$moduleData['definition'] = include_once($moduleData['path']);

			if (!is_callable($moduleData['definition'])){
				throw new \Exception("Can't init module.");
			}


			$initParams = ($initParams)?$initParams:$moduleData['_initParams'];

			$moduleData['module'] = $moduleData['definition']($di, $initParams);


			$moduleData['isInited'] = true;
		}
	}

	function getModuleFilePath($modulesDir, $moduleName, $parentModule = null) {
		

		$nameParts = explode('-', $moduleName);

		if (count($nameParts) > 1){
			$type = $nameParts[count($nameParts)-1];
		} else {
			$type = 'module';
		}
		
		if ($type !== 'module'){
			$typeDir = $type.DIRECTORY_SEPARATOR;
		} else {
			$typeDir = DIRECTORY_SEPARATOR;
		}

		if ($parentModule){
			$parentModuleDir = $modulesDir.DIRECTORY_SEPARATOR.$parentModule;
			return $parentModuleDir.DIRECTORY_SEPARATOR.$typeDir.$moduleName.'.php';
		}

		return $modulesDir.DIRECTORY_SEPARATOR.
		$moduleName.$typeDir.
		$moduleName.'-'.$type.'.php';
	}

	function get($di, $moduleName){
		//TODO Implement init params
		bootsrap($di, $di[$moduleName]);
		return $di[$moduleName]['module'];
	}


}