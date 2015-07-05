requirejs.config({
	paths: {
		'angular': '../bower_components/angular/angular',
		'domReady': '../bower_components/requirejs-domready/domReady',
		'uiRouter': '../bower_components/angular-ui-router/release/angular-ui-router',
		'uiBootstrap': '../bower_components/angular-bootstrap/ui-bootstrap',
		'uiBootstrapTpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
		'jquery': '../bower_components/jquery/dist/jquery',
		'bootstrap-ui': '../bower_components/bootstrap/dist/js/bootstrap',
	},
    baseUrl: 'app/',
	shim: {
		'angular': {
		 	exports: 'angular'
		},
		'uiRouter':{
            deps: ['angular']
        },
        'uiBootstrap':{
        	deps: ['angular']	
        },
		'jquery': {
			exports: 'angular'
		},
		"bootstrap-ui" : { 
			deps :['jquery'] 
		}
	},
	deps: ['./bootstrap']
});