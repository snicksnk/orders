'use strict';

angular.module('Yeopen')
    .controller('NewMessagesCtrl', function($scope, CurrentUser, MessagesService, $stateParams){
        
        $scope.messageService = MessagesService;

        $scope.$watch("messageService.unreadCount", function(data){
            $scope.unreadCout = $scope.messageService.unreadCount;
        });
                
        MessagesService.getUnreadCount();
        
        MessagesService.runGetCountData();
        //$scope.$watch("")
    });