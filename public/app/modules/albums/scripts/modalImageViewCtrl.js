'use strict';

angular.module('Yeopen')


    .controller('modalFeedImageViewCtrl', ['$scope', '$rootScope', '$stateParams', '$state',
        'AttachImage', 'Events', 'FeedsList', 'CurrentUser', 'AlbumsService',
        function($scope, $rootScope, $stateParams, $state, AttachImage, Events, FeedsList, CurrentUser, AlbumsService){
            
            
            $scope.image;
            $scope.views = 0;
            $scope.comments = [];
            $scope.newCommentText = {};
            $scope.currentUser = CurrentUser;
            //console.log(CurrentUser);
            var id = 0;
            var feed = {};
        
            $scope.likes = 0;
            $scope.freezeLikes = false;
        
            $scope.prevState = false;
            $scope.nextState = false;
            
            function preloadImage(url)
            {
                console.log(url);
                var img = new Image();
                img.src = url;
            }
        
            $scope.onOpen = function(){
               
                if (FeedsList.feeds.length < 1){
                    //TODO Hack solution
                    if($state.current.name =='imageModal'){
                        FeedsList.getFeedsForUser(CurrentUser.id).success(function(data){
                             $scope.feedList = FeedsList;
                        });
                    } else if($state.current.name == 'albumPhotoModal'){
                        AlbumsService.getChildrens($stateParams.albumId).success(function(data){
                            FeedsList.setFeedsList(AlbumsService.childrens);
                        });
                    }
                }
                
                
                var feedId = $stateParams.id;
            
                $scope.feedList = FeedsList;
                
                $scope.like = function(feedId){
                    if ($scope.freezeLikes){
                        return false;
                    }
                    $scope.freezeLikes = true;
                    FeedsList.likeFeed(feedId).success(function(result){
                        $scope.likes = result['likes'];
                    });
                }
            
                $scope.$watch('feedList.feeds', function(){
                    feed = FeedsList.getFeedWithId(feedId);
                   
                    if (feed)
                    {
                    
                        $scope.likes = feed.likes;
                        $scope.feed = feed;
                        $scope.image = feed.image;
                        id = feed.id;
                        $scope.isEditable = CurrentUser.isCurrentUser(feed.user);
                        $scope.image.user = feed.user;
                        $scope.image.comments = feed.comments;
                        $scope.image.formedDate = feed.formedDate;
                        $scope.views = feed.image.views;
                        
                        AlbumsService.incrementViews(feed.image.id);
                  
                        
                        
                        
                        if ($state.current.name === 'imageModal'){
                            var feedsList = _.clone(FeedsList.feeds);
                            $scope.prevState = $scope.getNextImageId(feedId, feedsList);

                            var reverseFeeds = feedsList.reverse();
                            $scope.nextState = $scope.getNextImageId(feedId, reverseFeeds);
                        } else {
                            var feedsList = _.clone(FeedsList.feeds);
                            $scope.nextState = $scope.getNextImageId(feedId, feedsList);

                            var reverseFeeds = feedsList.reverse();
                            $scope.prevState = $scope.getNextImageId(feedId, reverseFeeds);
                          
                        }
                        
                        
                        
                       // $scope.prevImage =  
                    } 
                });
                
                
            }


            $scope.share = function(feedId){
                FeedsList.shareFeed(feedId);
            };

            $scope.getNextImageId = function(feedId, feeds){
               
                 var key, redirectToFeed, nextId;
            
          
                for (var i in feeds){
                    var feed = feeds[i];
                    var image = feed['image'];
                    if (!image){
                        continue;
                    }
                    
                    if (typeof key !== 'undefined'){
                        nextId = i;
                        break;

                    }
                    if (feed.id == feedId){
                        key = parseInt(i);
                        continue;
              //          break;
                    }    
                }
                
                if (redirectToFeed = feeds[nextId]){
                    
                } else {
                    return false;
                }
                
                preloadImage(redirectToFeed.image.img_mid);
                
                return ({
                        state: $state.current.name,
                        params:{
                        albumId:redirectToFeed.image.albumId ,
                        id: redirectToFeed.id
                }});
            };
            

            $scope.nextImage = function(imageId){
                $state.go($scope.nextState.state, $scope.nextState.params);
            };
            
            $scope.prevImage = function(imageId){
                $state.go($scope.prevState.state, $scope.prevState.params);
            };




            $scope.writeComment = function(feedId) {
                FeedsList.createComment(id, $scope.newCommentText[feedId]);
                $scope.newCommentText[feedId] = '';
            }
     
            $scope.deleteComment = function(commentId) {
                FeedsList.deleteComment(id, commentId);
            }

            $scope.edit = function(){
                var id = (feed.repostData)?feed.repostData.id:feed.id;
                if ($state.current.name == 'albumPhotoModal'){
                    $state.go('albumPhotoEdit',{'id':id, 'mode':'album','albumId':$stateParams.albumId})
                } else {
                    $state.go('editImage', {'id':id, 'mode':'feed'});
                }
            }

            $scope.isDisplay = true;
            $scope.close = function(){
                if ($state.current.name == 'albumPhotoModal'){
                    $state.go('photoInAlbum', {'albumId': $stateParams.albumId})
                } else if ($state.current.name == 'imageModalFullScreen'){
                    $state.go('imageModal', {'id': $stateParams.id})
                }
                else {
                    $state.go('main');
                }
            };

            var listener = new window.keypress.Listener();

            listener.simple_combo("escape", function() {
                $scope.close();
            });
        }])
