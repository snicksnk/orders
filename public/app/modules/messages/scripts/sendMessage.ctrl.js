'use strict';

angular.module('Yeopen')
    .controller('SendMessageCtrl', function($scope, CurrentUser, MessagesService, $stateParams){


        $scope.text = "";
        $scope.receiverId = 0;
        $scope.messageService = MessagesService;
        
        $scope.show = true;

        var receiverId = $stateParams.receiverId || CurrentUser.id;
        
        
        $scope.message = {
            'message': "",
            'receiver_user_id': receiverId
        };
        
        
        $scope.close = function(){
            $scope.show = false;
        };


        $scope.send = function(){

            MessagesService.create($scope.message).success(function (data) {

            });

            $scope.message.message = '';
            
            $scope.close();

            //location.reload();
        };

    });