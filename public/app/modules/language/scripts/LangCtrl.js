'use strict';
angular.module('Yeopen')
.controller('LangCtrl',['$scope', 
function($scope){
    $scope.switchLang = function ($lang){
    $.cookie('lang', $lang, {'path':'/'});
    location.reload();
    };
    
    $scope.currentLang = $.cookie('lang') || 'ru_RU';
    
}]);

