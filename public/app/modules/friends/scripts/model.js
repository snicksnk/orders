'use strict';

angular.module('Yeopen')

.factory('FriendsModel', ['$rootScope', 'HttpService', 'StoreService', 'Routes', 'Events',
    function($rootScope, HttpService, StoreService, Routes, Events) {

        var defaultAction = function(route, data) {
            var storeData = route.storeKey && StoreService.get(route.storeKey,
                typeof data.validate === 'undefined' || data.validate === '' ?
                    true : data.validate
            ); if (storeData && storeData.length) return storeData;

            HttpService.httpRequest(route, data);
            route.storeKey && $rootScope.$on(route.eventSuccess,
                function(event, args) {
                    StoreService.set(route.storeKey,
                        typeof data.validate === 'undefined' || data.validate === '' ?
                            true : data.validate,
                        args
                    );
                }
            ); return [];
        };

        var addRemoveAction = function(route, data, index, storeCallback) {
            var storeData = StoreService.get(route.storeKey, false, true);
            storeCallback(storeData, index);
            StoreService.update(route.storeKey, storeData);

            HttpService.httpRequest(route, data);
            $rootScope.$on(route.eventSuccess,
                function(event, args) {
                    $rootScope.$broadcast(Events.friendsUpdated, StoreService.get(route.storeKey, false, true));
                }
            ); return true;
        };

        return {
            getFriends: function(data) {
                return defaultAction(Routes.getFriends, data);
            },
            searchFriends: function(data) {
                return defaultAction(Routes.searchFriends, data);
            },
            removeFriend: function(data, index) {
                return addRemoveAction(Routes.removeFriend, data, index, function(data, index) {
                    //data.splice(index, 1);
                    data[index].isFriend = false;
                });
            },
            addFriend: function(data, index) {
                return addRemoveAction(Routes.addFriend, data, index, function(data, index) {
                    data[index].isFriend = true;
                });
            }
        };
    }
]);