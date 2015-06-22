'use strict';

angular.module('Orders')

.constant('Routes', {
    getFriends: function(userId, searchText) {
        if(!searchText){
            searchText = '';
        }
        var params = $.param({'id':userId,'searchText':searchText});
        return {
            url: '/user/friends/?'+params,
            method: 'get',
            withParams: true,
            eventSuccess: 'friends:obtained',
            eventError: 'friends:obtainingError',
            storeKey: 'friends:list'
        }
    },
    searchFriends: {
        url: '/user/friends/',
        method: 'post',
        withParams: false,
        eventSuccess: 'friends:searched',
        eventError: 'friends:searchingError',
        storeKey: 'friends:list'
    },
    removeFriend: {
        url: '/user/remove/',
        method: 'post',
        withParams: true,
        eventSuccess: 'friends:removed',
        eventError: 'friends:removingError',
        storeKey: 'friends:list'
    },
    addFriend: function(userId){
        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/friends/add',
            method: 'post',
            data:  $.param({'id':userId}),
            withParams: true
        }
    },
    unFriend: function(userId){
        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/friends/delete',
            method: 'post',
            data:  $.param({'id':userId}),
            withParams: true
        }
    },
    createFeed: function(data) {
        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/news/addfeed',
            method: 'post',
            data:  $.param(data),
            withParams: true
        }
    },
    
    getFeedLinkPreview: function(content) {
        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/news/getLinkPreview',
            method: 'post',
            data:  $.param({'content':content}),
            withParams: true
        };
    },
    
    createComment: function(data){
       
        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/news/addComment',
            method: 'post',
            data:  $.param(data),
            withParams: true
        }
    },

    deleteFeed: function(feedId) {

        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/news/deleteFeed',
            method: 'post',
            data:  $.param({'id':feedId}),
            withParams: true
        }

    },
    
    likeFeed: function(feedId){
         return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/news/like',
            method: 'post',
            data:  $.param({'id':feedId}),
            withParams: true
        }
    },

    shareFeed: function(feedId) {
        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/news/share',
            method: 'post',
            data:  $.param({'id':feedId}),
            withParams: true
        }  
    },

    deleteComment: function(commentId) {
        return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: '/user/news/comments/remove/',
            method: 'post',
            data:  $.param({'id':commentId}),
            withParams: true
        } 
    },

    feedsListOfUserWithId: function(userId){
        return {
            url: '/user/news/getFeedsList?id=' + userId ,
            method: 'get',
            withParams: true,
            eventSuccess: 'friends:added',
            eventError: 'friends:addingError',
            storeKey: 'friends:list'
        }
    },

    saveImageInfo: function (imageData) {
         return {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'post',
            data:  $.param(imageData),
            url: '/images/editImage',
            withParams: true
        }
    },

    albums: {
        'list': function (userId) {
            if (!userId) {
                userId = '';
            }
            return {
                url: '/user/albums/' + userId,
                method: 'get'
            }
        },
        'remove': function (albumId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param({'id': albumId}),
                url: '/user/albums/' + albumId + '/remove/',
                withParams: true
            }
        },
        'edit': function (albumData) {
            var albumId = albumData['id'];
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param(albumData),
                url: '/user/albums/' + albumId + '/edit/',
                withParams: true
            }
        },
        'childrens': function (parentId) {
            return {
                url: '/user/albums/' + parentId + '/childrens/',
                method: 'get'
            }
        },
        'incrementViews': function (imageId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param({'imageId': imageId}),
                url: '/images/incrementViews',
                withParams: true
            }
        }
    },
    'friendsAdded': {
        'list': function (userId) {
            if (!userId) {
                userId = '';
            }
            return {
                url: '/user/friends/applications/short',
                method: 'get'
            }
        },
	},
    'friendsApplication': {
        'list': function (userId) {
            if (!userId) {
                userId = '';
            }
            return {
                url: '/user/friends/applications',
                method: 'get'
            }
        },
        'remove': function (applicationId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'get',
                url: '/user/friend_application/delete/' + applicationId
            }
        },
        'accept': function (applicationId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'get',
                url: '/user/friend_application/accepted/' + applicationId
            }
        },
        'delay': function (applicationId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'get',
                url: '/user/friend_application/delayed/' + applicationId
            }
        }
    },
    'messages': {
        'list': function (data) {
            if (!data){
                data = [];
            }
            return {
                url: '/user/messages/get_dialog_list',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param(data),
                withParams: true
            }
        },
        'childrens': function (childrensData) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param(childrensData),
                url: '/user/messages/get_dialog',
                withParams: true
            }
        },
        'create': function (messageData) {
            console.log(messageData);
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param(messageData),
                url: '/user/messages/send',
                withParams: true
            }
        },
        'remove': function (dialogId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param({'id_dialog': dialogId}),
                url: '/user/messages/delete_dialog',
                withParams: true
            }
        },
        'restoreDialog': function(dialogId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param({'id_dialog': dialogId}),
                url: '/user/messages/restore_dialog',
                withParams: true
            }
        },
        'removeAllMessages': function (dialogId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param({'id_dialog': dialogId}),
                url: '/user/messages/remove/all',
                withParams: true
            }
        },
        'deleteMessage': function (messageId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param({'message_id': messageId}),
                url: '/user/messages/delete_message',
                withParams: true
            }
        },
        'hasNew': function () {
            
        },
        'accept': function (applicationId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'get',
                url: '/user/friend_application/accepted/' + applicationId
            }
        },
        'delay': function (applicationId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'get',
                url: '/user/friend_application/delayed/' + applicationId
            }
        },
        'unreadCount': function (applicationId) {
            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'get',
                url: '/user/messages/get_count_of_unreaded'
            }
        }        
    }
});