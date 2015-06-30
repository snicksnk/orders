'use strict';

angular.module('Yeopen')

.filter('translate', function($http) {
		//todo fix it
		var dic;
		jQuery.ajax({
        	url: '/user/dictionary/',
        	success: function(result) {
           		dic = result;
            },
         	async:   false
    	});
		
		return function(text){
			return dic[text] || text;
		}
	});