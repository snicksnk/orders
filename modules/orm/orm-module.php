<?php 
return module\define([], function(){
	require APP_ROOT.'vendor/ReadBean/rb.php';
	R::setup('sqlite:/tmp/dbfile.db');
/*	$book = R::dispense( 'book' );
	$book->title = 'Learn to Program';
    $book->rating = 10;
	$book['price'] = 29.99; //you can use array notation as well
  	$id = R::store($book);
*/
	return function(){
		return false;
	};
});