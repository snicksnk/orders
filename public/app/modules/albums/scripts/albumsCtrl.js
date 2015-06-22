'use strict';

angular.module('Yeopen')


    .controller('AlbumsCtrl', function($scope, $filter, $state, $stateParams, AttachImage, AlbumsService, CurrentUser){
        
        $scope.currentAlbumId = $stateParams.albumId;
        
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

        $scope.edit = function(albumId, newName){
            AlbumsService.edit({id:albumId, title: newName}, CurrentUser.id);
        }

        $scope.isEditable = CurrentUser.isCurrentUserPage();

        $scope.list = AlbumsService.list;
        $scope.albumService = AlbumsService;
        $scope.$watch('albumService.list', function(list){
            $scope.list = AlbumsService.list;
        });

    })