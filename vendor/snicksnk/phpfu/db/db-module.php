<?php 
namespace phpfu\db;
function createRequest($dbProcessor, $entities, $request, array $params = null){
	$link = $dbProcessor()['link'];

	if ($params){
		$request = bindParams($dbProcessor, $request, $params);
	}


	$requestCallback = function() use ($link, $request, $params){
		$query = mysqli_query($link, $request);
		if ($params){
			//TODO Implement it
			//mysqli_stmt_bind_param()
		}

		if(!$query){
			throw new \Exception("Cant perform request {$request}");
		}
		return $query;
	};
	return $requestCallback;
};

function fetchAll($requestCallback){

	$result = $requestCallback();
	$resultArray = [];
	while($row = mysqli_fetch_assoc($result)){
		$resultArray[] = $row;
	}
	mysqli_free_result($result);
	return $resultArray;
}

function escapeValue($dbProcessor, $value){
	$link = $dbProcessor()['link'];
	if (is_string($value)){
		$paramInQuery = '"'.mysqli_real_escape_string($link, $value).'"'; 
	} else if (is_int($value) || is_float($value)){
		$paramInQuery = mysqli_real_escape_string($link, $value); 		
	} else {
		throw new \Exception("Invalid type {gettype($value)} for param {$name} ");
	}
	return $paramInQuery;
}

function bindParams($dbProcessor, $request, array $params){
	foreach ($params as $name => $value) {

		if (is_string($value) || is_int($value) || is_float($value)){
			$paramInQuery = escapeValue($dbProcessor, $value); 	
		} else if (is_array($value)) {
			
			$clearValues = array_map(function($value) use ($dbProcessor){
				return escapeValue($dbProcessor, $value);
			}, $value);

			$paramInQuery = '('.join(', ', $clearValues).')';
		} else {
			throw new \Exception("Invalid type {gettype($value)} for param {$name} ");
		}
		$request = str_replace(':'.$name, $paramInQuery, $request);
	}
	return $request;
}


return \module\define(['config'], function($config){
	$currentConnection = null;
	return function() use ($currentConnection, $config){
		if (!$currentConnection){
			$dbConfig = $config()['modules']['db'];
			$currentConnection = mysqli_connect($dbConfig['host'], $dbConfig['user'], $dbConfig['password'] ,$dbConfig['dbname']);
			if (mysqli_connect_errno()) {
			    throw new \Exception("Can't connect to db:  {mysqli_connect_error()}");
			}
			mysqli_set_charset($currentConnection, "utf8");
		}
		return ['link' => $currentConnection];
	};
});