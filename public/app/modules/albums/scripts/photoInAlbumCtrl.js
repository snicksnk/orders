'use strict';

angular.module('Yeopen')


    .controller('PhotoInAlbumCtrl', function($scope, $stateParams, $state, AttachImage, 
        AlbumsService, CurrentUser,
     FeedsList){
        
    	var albumId = $stateParams.albumId;


        
        $scope.isEditable = CurrentUser.isCurrentUserPage();

        $scope.attachImage = function(){
            $scope.imageService = AttachImage;
            
            $state.currentAlbumId = $stateParams.albumId;
            //$state.go('editImage', {'id':id, 'mode':'album'});
            var nextStateParams = {};
            AttachImage.advancedAttach({
                'completeCallback':function(data){
                    AlbumsService.getList(CurrentUser.id);
                    nextStateParams['albumId'] = data['albumId'];
                    console.log(data);
                    //$state.go('editImage', {'id':data['albumId'], 'mode':'album'});
                },
                'needAlbum':true,
                'nextStateName':'photoInAlbum',
                'nextStateParams':nextStateParams
            });


        };

        $scope.removeAlbum = function(albumId){
            AlbumsService.delete(albumId).success(function(){
                $state.go('albums');
            });
        };

    	$scope.albumId = albumId;
    	$scope.albumService = AlbumsService;
        

    	$scope.$watch('albumService.list', function(data){
    		$scope.album = AlbumsService.getWithId(albumId);	
    	});

        $scope.$watch('album.title', function(){
            if ($scope.album){            
                //AlbumsService.edit({id:$scope.album.id, title: $scope.album.title}, CurrentUser.id);
            }
        });

        $scope.edit = function(){
            AlbumsService.edit(
                {
                    id:$scope.album.id, 
                    title: $scope.album.title
                }, CurrentUser.id); 
        }

        AlbumsService.getChildrens(albumId).success(function(data){
            FeedsList.setFeedsList(AlbumsService.childrens);
            $scope.list = AlbumsService.childrens;
            $scope.albumsList = AlbumsService.list;
            //console.log($scope.album,'=====');
        });
    });


