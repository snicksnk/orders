<?php 
namespace orders\model;
function getList($db){
	
	$request = \phpfu\db\createRequest($db, ['order'], 'SELECT * FROM `order` WHERE 1', ['ids' => [1,2,3,'sasaa']]);
	$result = \phpfu\db\fetchAll($request);
	return $result;

}

function delete($db, $id){
	$request = \phpfu\db\createRequest($db, ['order'], 'DELETE FROM `order` WHERE id = :id', ['id' => (int)$id]);
	return $request();
}