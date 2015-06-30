'use strict';
angular.module('Orders', ['ui.router', 'ui.bootstrap', /*'ngMockE2E''ui.splash'*/])
.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
])