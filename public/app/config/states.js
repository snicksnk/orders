'use strict';
angular.module('Orders')
 .run( [ '$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            $rootScope.$previousState = from;
            $rootScope.$previousState['params'] = fromParams;            
        });
      }])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    }
]);