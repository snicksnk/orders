'use strict';


angular.module('Yeopen')
	.factory('FeedsList', function($http, Routes, CurrentUser, $rootScope){
	    //TODO Using of global varible  
	    var FeedsList = {
	        feeds : [],
                userId: false,
	        feedsRegistr : {},
	        getFeedsForUser: function(userId){
	            return $http(Routes.feedsListOfUserWithId(userId)).success(function(data){
	                FeedsList.feeds = data;
	                FeedsList.userId = userId;
	            });
	        },
	        setFeedsList: function(data){
	        	FeedsList.feeds = data;
	        },
                
                getFeedLinkPreview: function(content){
                    var request = $http(Routes.getFeedLinkPreview(content)).success(
                        function(data){
                            return data;
                        }
                    );
                    return request;
                },
                
	        getFeedWithId: function(feedId){
	            /*
	            for (var i in FeedsList.feeds) {
	            	var feed = FeedsList.feeds[i];
					if (feed['id'] == feedId) {
						return feed;
					}	            	
	            }
	            */
                   
	            var feed = _.find(FeedsList.feeds, function(feed){
	            	if (feed['id'] == feedId) {
                            return true;
                        }	
	            });
	            return feed;
	        },
	        create: function(content, imageId, linkIsRemoved) {
	        	var request = $http(Routes.createFeed({'content':content,'imageId':imageId, 'linkIsRemoved': linkIsRemoved})).success(
	        		function(data){
	        			FeedsList.feeds.unshift	(data);
	        		}
	        	);
	        },
                shareFeed: function(feedId, userId){
                var that = this;
                var request = $http(Routes.shareFeed(feedId))
                    .success(
                    function(data){
                        //FeedsList.getFeedsForUser(FeedsList.userId);
                        //window.location.href = '/user/news/myLife/'+CurrentUser.getLogedInUserProfile()['id']+'#shared';
                        $rootScope.$broadcast('share/my-life');
                        //FeedsList.getFeedsForUser(userId);
                    }
                );

                return request;
            },
	        createComment: function(feedId, content) {
	        	var request = $http(Routes.createComment(
	        		{
	        			'feedId':feedId,
	        			'feedText':content
	        		}))
	        	.success(
	        		function(data){
	        			var feed = FeedsList.getFeedWithId(feedId);
	        			feed.comments.push(data);
	        		}
	        	);
	        },
	        deleteFeed: function(feedId) {

	        	var request = $http(Routes.deleteFeed(feedId))
	        	.success(
	        		function(data){
	        			if (data['result'] == false){
	        				return false;
	        			}
	        			for (var i in FeedsList.feeds) {
			            	var feed = FeedsList.feeds[i];
							if (feed['id'] == feedId) {
								FeedsList.feeds.splice(i,1); 
							}	            	
			            }
	        		}
	        	);
	        },
                
                likeFeed: function(feedId) {
                    return $http(Routes.likeFeed(feedId));	
	        },
                
	        deleteComment: function(feedId, commentId) {
	        	var request = $http(Routes.deleteComment(commentId))
	        	.success(
	        		function(data){
	        			if (data['result'] == false){
	        				return false;
	        			}
			        	var feed = FeedsList.getFeedWithId(feedId);
			        	for (var i in feed.comments) {
			            	var comment = feed.comments[i];
							if (comment['id'] == commentId) {
								feed.comments.splice(i,1); 
							}	            	
			            }
	        	});
	        }
	    } 
					
		return FeedsList;
	})
