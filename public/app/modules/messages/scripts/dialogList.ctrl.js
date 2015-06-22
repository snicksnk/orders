'use strict';

angular.module('Yeopen')
.controller('DialogsListCtrl', function($scope, MessagesService, $stateParams, $state){

        var messageDir = 1;
        if ($stateParams.messageDir) {
            messageDir = $stateParams.messageDir;
        };
        $scope.deleteIsWork = true; 
        $scope.messageDir = messageDir;
        
        if (messageDir == 2) {
            $scope.deleteIsWork = false;
        }

        
        MessagesService.list = [];

        MessagesService.getList({'type':messageDir}).success(function(data){
           // console.log(MessagesService.list);
        });

        
        $scope.messageService = MessagesService;

        $scope.delete = function (dialogId) {
            MessagesService.delete(dialogId);
        };
        
        $scope.restoreDialog = function (dialogId) {
            MessagesService.restoreDialog(dialogId).success(function(){
                MessagesService.getList({'type':messageDir}).success(function(data){
                    // console.log(MessagesService.list);
                });
            });
        };

        $scope.removeAll = function() {
            if (confirm("Are your sure?")) {
                MessagesService.deleteAllMessages();
            } else {
                
            }
        };

        $scope.$watch('messageService.list', function() {
            $scope.list = MessagesService.list;
            
        });
});