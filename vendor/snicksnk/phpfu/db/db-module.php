<?php 
namespace phpfu\db;
function request($dbProcessor, $entities, $request, $params = []){
	$link = $dbProcessor()['link'];
	$query = mysqli_prepare($link, $request);
	if ($params){
		//TODO Implement it
		//mysqli_stmt_bind_param()
	}

	if(!$query){
		throw new \Exception("Cant perform request {$request}");
	}
	
	return $query;
};

function fetchAll($result){
	while($resultArray[] = mysqli_stmt_fetch($result));
	mysqli_free_result($result);
	return $resultArray;
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

		}
		return ['link' => $currentConnection];
	};
});