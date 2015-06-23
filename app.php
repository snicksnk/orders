<?php  
namespace {
	define('APP_ROOT', __DIR__.DIRECTORY_SEPARATOR);
	require_once(__DIR__.DIRECTORY_SEPARATOR."vendor/snicksnk/phpfu/modules/bootstrap.php");
	$configPath = APP_ROOT.'config'.DIRECTORY_SEPARATOR.'app.cfg.php';
	$di = [];
	$modulesDir = APP_ROOT.'vendor'.DIRECTORY_SEPARATOR.'snicksnk'.
	DIRECTORY_SEPARATOR.'phpfu';
	//die($modulesDir);
	\module\load($di, 'config', \module\getModuleFilePath($modulesDir, 'config'));
	\module\load($di, 'router', \module\getModuleFilePath($modulesDir, 'router'));
	//TODO Fix it mb?
	\module\bootstrapAll($di);
	\module\load($di, 'application', \module\getModuleFilePath($modulesDir, 'application'), ['di' => $di]);
	
	\module\bootstrapAll($di);
}