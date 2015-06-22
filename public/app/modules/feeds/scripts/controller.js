'use strict';


angular.module('Yeopen')

	.controller('FeedsCtrl',['$scope','AttachImage','$rootScope', 'Events', 'FeedsList', 'CurrentUser', 
            function($scope, AttachImage, $rootScope, Events, FeedsList, CurrentUser){

                $scope.imageId = ' ';
                
                $scope.showFeedInput = false;
                
                
                $scope.linkIsRemoved = false;
                
                $scope.currentUser = CurrentUser;
                
                
                $scope.$watch("content", function(val){
                    
                    $scope.linkIsRemoved = false;
                 
                    var result;
                    if(result = findLinks(val) && !$scope.linkIsRemoved){
                        console.log(result);
                        var val = FeedsList.getFeedLinkPreview(val).success(function(data){
                            $scope.linkPreview = data;
                        });
                    }
                    $scope.linkPreview = [];
                });

                function findLinks(s) {
                    if (s){
                        var hlink = /((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/gi;
                        var result = hlink.exec(s);
                        return result;
                    }
                }
                
                $scope.attachImage = function(){

                        $scope.imageService = AttachImage;
                        
                        $scope.percentOfLoad = 0;
                        
                        $scope.imageSrc = false;
                        
                        $scope.imageId = false;
                        
                        AttachImage.advancedAttach(
                        {
                           // currentHref: 'uploadImageToFeed',
                            hiddenMode: true,
                            percentCallback: function(percent){
                                $scope.percentOfLoad = percent;
                            },
                            completeCallback: function(data){	
                                $scope.imageId = data['id'];
                                //$("#feed-prev-image").attr("src", data['img_mid']);
                                //$("#feedImageId").val( data['id']);
                                
                                $scope.imageSrc = data['img_mid'];
                                //FeedsList.create(data['description'], data['id']);
                                //$scope.$apply();
                      
                            }
                        });
                        
                        
                };
                
                $scope.removeImg = function(){
                    $scope.imageId = false;
                    $scope.imageSrc = false;
                }
                
                $scope.removeLink = function(){
                    $scope.linkIsRemoved = true;
                }

                $scope.send = function(htmlForm){
                    
                    
                    
                    if ($scope.content == '' &&  !$scope.imageId){
                        return;
                    }
                    
                    
                    FeedsList.create($scope.content, $scope.imageId, $scope.linkIsRemoved);
                    $scope.content = '';
                    $scope.attachedImageId = '';
                    
                    
                    $scope.imageId = false;
                    $scope.imageSrc = false;    
                    
                };

                FeedsList.getFeedsForUser(userId).success(function(data){
                    $scope.feeds = data;
                });
/*
                $scope.$watch('FeedsList.feeds', function($feed){
                    $scope.feeds = FeedsList.feeds;
                });
*/
                $scope.commentsIsExpanded = {'blank':'true'};
                $scope.commentsInputIsExpanded = {'blank':'true'};
                $scope.newCommentText = {'blank':'true'};

                $scope.currentUser = CurrentUser;
                
                $scope.expandNewPostInput = false;
                $scope.expandContentInput = function () {
                    $scope.expandNewPostInput = true;
                    //$('.textarea-post').parents('.add-news').toggleClass('active');
                };
                
                $scope.hideContentInput = function () {
                    $scope.expandNewPostInput = false;
                };





                $scope.expandFeedComments = function(feedId) {
                        $scope.commentsIsExpanded[feedId] = true;
                        $scope.commentsInputIsExpanded[feedId] = true;
                };

                $scope.collapseFeedComments = function(feedId) {

                        $scope.commentsIsExpanded[feedId] = false;
                        $scope.commentsInputIsExpanded[feedId] = false;

                };


                $scope.toggleComments = function(feedId) {
                    if ($scope.commentsIsExpanded[feedId]) {
                        $scope.collapseFeedComments(feedId);
                    }
                    else {
                        $scope.expandFeedComments(feedId);
                    }
                };

                $scope.expandCommentsInput = function(feedId) {
                        $scope.commentsInputIsExpanded[feedId] = true;
                };

                $scope.collapseCommentsInput = function(feedId) {
                        $scope.commentsIsExpanded[feedId] = false;
                        $scope.commentsInputIsExpanded[feedId] = false;
                };

                $scope.shareFeed = function(feedId) {
                    FeedsList.shareFeed(feedId, $scope.currentUser.id);
                };

                $scope.deleteFeed = function(feedId) {

                        FeedsList.deleteFeed(feedId);
                };

                $scope.writeComment = function(feedId) {
                        FeedsList.createComment(feedId, $scope.newCommentText[feedId]);
                        $scope.newCommentText[feedId] = '';
                }

                $scope.deleteComment = function(feedId, commentId) {
                        FeedsList.deleteComment(feedId, commentId);
                }

            }]);


