'use strict';
define([
     'require',
     'angular',
     'app',
     'config/states',
     'uiRouter',
     'uiBootstrap'
 ], function (require, ng, app) {
 	
	require(['domReady!', 'app'], function (document, app) {
		ng.bootstrap(document, ['Orders']);
	});
});