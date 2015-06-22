'use strict';

angular.module('Yeopen')
    .controller('ShareWithFriends', function($scope, CurrentUser, ShareWithFrinedsSvc, FeedsList){
        
        $scope.people = [];
      
        $scope.showModal = false;
        
        $scope.show = function() {
            $scope.showModal = true;
        };
       
        $scope.currentUser = CurrentUser;
        
        $scope.share = function(feedId) {
           ShareWithFrinedsSvc.setFeedById(feedId);
        };
        
        $scope.shareMyLife = function(feedId) {
            FeedsList.shareFeed(feedId, $scope.currentUser.id);
        };
    });