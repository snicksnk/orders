<?php 
return module\define(['goods'], function($goods){
	echo "welcome is inited! \n\n";
	echo "Goods list is \n".join("\n", $goods());
	return function(){
		echo 'Welcome';
	};
});