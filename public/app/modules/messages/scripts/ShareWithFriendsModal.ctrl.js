'use strict';

angular.module('Yeopen')
    .controller('ShareWithFriendsModal', function($scope, CurrentUser, MessagesService, FriendsService, ShareWithFrinedsSvc, $rootScope){
        
        $scope.messageService = MessagesService;
        
        $scope.people = [];
      
        $scope.shareSvc = ShareWithFrinedsSvc;
        
        $scope.showModal = false;
        
        $scope.friendsService = FriendsService;
        
        $scope.currentUser = CurrentUser;
        
        $scope.selectedFriend = false;
        
        $scope.expand = false;
        
        $scope.showSuccess = false;
        
        
        $scope.friendsService = FriendsService;
        
        $scope.showSuccessLife = false;
        
       $rootScope.$on("share/my-life", function(){
            $scope.showSuccessLife = true;
       }); 
        
       $scope.$watch("shareSvc.showModal", function(val){
            if (val){
                $scope.show();
            };
       });
       
       $scope.$watch("resultObject", function(val){
           console.log(val);
       });
       
       $scope.$watch("friendsService.list", function(val){
            $scope.peoples = val;
       });

       
       $scope.selectFriend = function(friend) {
           console.log(friend);
           $scope.friendsSearchText = friend.displayName;
           $scope.hideList();
           $scope.selectedFriend = friend;
       };
       
       $scope.searchFriend = function(text) {
           
           FriendsService.search(CurrentUser.id, text);
       };
       
       $scope.showList = function(){
           $scope.expand = true;
       };
       
       $scope.hideList = function() {
           $scope.expand = false;
       };
       
       $scope.show = function() {
           
            FriendsService.getList(CurrentUser.id).success(function(data){
                
            });
            $scope.showModal = true;
            $scope.feed = ShareWithFrinedsSvc.feed;
       };
       
       $scope.hide = function(withSuccess) {
            $scope.showModal = false; 
            $scope.showSuccessLife = false;
            if (withSuccess){
                $scope.showSuccess = true;
            } else {
                $scope.showSuccess = false; 
            }
            ShareWithFrinedsSvc.showModal = false;
       };
       
      
        

        $scope.send = function(){
            if (!$scope.selectedFriend){
                return;
            }
            
            var receiverId = $scope.selectedFriend.id;
            
            var message = {
                'message': "",
                'receiver_user_id': receiverId,
                'feed_id': ShareWithFrinedsSvc.feed.id
            };
                

            MessagesService.create(message).success(function (data) {
                $scope.hide(true);
            });
            
            
            
            //location.reload();
        };

        

    });