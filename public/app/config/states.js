'use strict';
function genTemplateUrl(url){
    var curTimeIndex = new Date().getTime();
   return url + '?time=' + curTimeIndex;
};

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