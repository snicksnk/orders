'use strict';

angular.module('Yeopen')

    .factory('FriendsService', ['$http', 'Routes', function($http, Routes){

        var friends = function(){
            this.shortList = [];
            this.loadedFriends = [];
            this.list = [];
            this.info = {};
        }


        angular.extend(friends.prototype, {

            getList: function(userId, searchText) {
                var that = this;
                return $http(Routes.getFriends(userId, searchText)).success(function(data) {
                    that.list = data.list;
                    that.loadedFriends = data.list;
                    that.info = data.info;
                });
            },
            search: function(userId, searchText){
                var that = this;
                if (!searchText){
                    that.list = that.loadedFriends;
                    return false;
                }
                var words = searchText.split(' ');
                words = _.filter(words, function(word){
                    if (word.replace(/^\s+|\s+$/g, '').length>0){
                        return true;
                    }
                });

                that.list = _.filter(this.loadedFriends, function(userDump){

                    for (var w in words){
                        var word = words[w];
                        if(userDump.displayName.toLowerCase().search(word.toLowerCase()) != -1){
                            return true;
                        }
                    }

                });
            },
            getForBlock: function(userId) {
                var that = this;
                $http(Routes.getFriends(userId)).success(function(data) {
                    that.shortList = data.list;
                    that.info = data.info;
                });
            },
            addFriend: function(userId){
                return $http(Routes.addFriend(userId));
            },
            unFriend: function(userId){
                return $http(Routes.unFriend(userId));
            }

        });

        return new friends();

    }]);