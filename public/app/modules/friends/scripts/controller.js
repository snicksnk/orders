'use strict';

angular.module('Yeopen')

.controller('FriendsCtrl', ['$scope', '$rootScope', '$stateParams', 'Routes', 'Events', 'Libs',
        'FriendsService','CurrentUser',
    function($scope, $rootScope, $stateParams, Routes, Events, Libs, FriendsService, CurrentUser) {

        FriendsService.getList(CurrentUser.id);

        $scope.friendsService = FriendsService;

        $scope.currentUser = CurrentUser;

        $scope.$watch('searchPhrase', function(value){
            FriendsService.search(CurrentUser.id, value);
        });

        $scope.addFriend = function (friendId) {
            FriendsService.addFriend(friendId).success(function(){
                location.reload();
            });
        };

        $scope.unFriend = function (friendId){
            FriendsService.unFriend(friendId).success(function(){
                location.reload();
            });
        };



    }
])

.controller('FriendsBlockController',
    function (FriendsService, CurrentUser, $scope) {

        FriendsService.getForBlock(CurrentUser.id);
        $scope.friendsService = FriendsService;
        $scope.currentUser = CurrentUser;

    })

.controller('FriendButtonController', function($scope, CurrentUser, FriendsService, Routes){

        var friendId = CurrentUser.id;
        $scope.currentUser = CurrentUser;
        $scope.setFriendId = function(userId){
            friendId = userId;
        };

        $scope.setFriend = function(user){

            friendId = user.id;
            $scope.friendProfile = user;

            console.log( $scope.friendProfile);
        };

        $scope.friend = function () {
            FriendsService.addFriend(friendId).success(function(){
                location.reload();
            });
        };

        $scope.unFriend = function(friendId){
            FriendsService.unFriend(friendId).success(function(result){
                console.log(result)
                location.reload();
            });
        };
    });

/*

 var getFriendsCount = function() {
 var length = $scope.friends.length;
 if ($stateParams['index']) return length;
 for (var count = 0, i = 0; i < length; i++)
 if ($scope.friends[i].isFriend) count++;
 return count;
 };

 $scope.friends = FriendsModel.getFriends({
 data: {},
 param: $stateParams['index'],
 validate: $stateParams['index']
 });
 $scope.friends.length && Libs.shuffle($scope.friends);
 $scope.friendsCount = getFriendsCount();

 $rootScope.$on(Routes.getFriends.eventSuccess, function (event, args) {
 $scope.friends = args;
 $scope.friends.length && Libs.shuffle($scope.friends);
 $scope.friendsCount = getFriendsCount();
 });

 $rootScope.$on(Routes.searchFriends.eventSuccess, function (event, args) {
 $scope.friends = args;
 $scope.friends.length && Libs.shuffle($scope.friends);
 $scope.friendsCount = getFriendsCount();
 });

 $rootScope.$on(Events.friendsUpdated, function (event, args) {
 $scope.friends = args;
 $scope.friendsCount = getFriendsCount();
 });

 $scope.searchFriends = function(searchPhrase) {
 FriendsModel.searchFriends({
 data: {
 'name_part': searchPhrase
 },
 param: $stateParams['index'],
 validate: $stateParams['index']
 });
 };

 $scope.removeFriend = function(id, index) {
 FriendsModel.removeFriend({
 data: {},
 param: id
 }, index);
 };

 $scope.addFriend = function(id, index) {
 FriendsModel.addFriend({
 data: {},
 param: id
 }, index);
 }

 $rootScope.$on(Routes.getFriends.eventError, function (event, args) {
 console.log('Getting friends error:', args);
 });

 $rootScope.$on(Routes.removeFriend.eventError, function (event, args) {
 console.log('Removing friend error:', args);
 });
 */