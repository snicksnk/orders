'use strict';

angular.module('Yeopen')
    .controller('DialogsCtrl', function($scope, CurrentUser, MessagesService, $stateParams){


        var messageDir = 1;
        if ($stateParams.messageDir) {
            messageDir = $stateParams.messageDir;
        };
        $scope.deleteIsWork = true; 
        $scope.messageDir = messageDir;
        
        if (messageDir == 2) {
            $scope.deleteIsWork = false;
        }

        $scope.text = "";
        $scope.receiverId = 0;
        $scope.messageService = MessagesService;

        var receiverId = $stateParams.receiverId || CurrentUser.id;
        
        
        $scope.message = {
            'message': "",
            'receiver_user_id': receiverId
        };
        

        $scope.currentReceiverId = $stateParams.receiverId;

        
        $scope.$watch('messageService.messagesList', function (data) {
           //console.log(data);
            
            $scope.list = MessagesService.messagesList;
            
            setTimeout(function(){
                //TODO fix it
                $(".chat-mess-list").animate({ scrollTop: $(".chat-mess-list ").height() }, "slow");
            }, 1500);
            
        });
        
        
        MessagesService.messages(receiverId, messageDir);
        
        /*
        setInterval(function(){
            MessagesService.messages(receiverId);
        }, 3000);
        */
        

        $scope.deleteMessage = function (messageId) {
            MessagesService.deleteMessage(messageId);
        };

        $scope.send = function(){

            MessagesService.create($scope.message).success(function (data) {

            });

            $scope.message.message = '';

            //location.reload();
        };

    });