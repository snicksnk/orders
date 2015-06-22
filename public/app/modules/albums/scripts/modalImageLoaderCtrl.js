'use strict';
angular.module('Yeopen')

    .controller('ModalImageLoaderCtrl', ['$scope', '$rootScope', 'AttachImage', 'Events',
    '$stateParams', '$state', 'FeedsList', 'CurrentUser', 'AlbumsService', 
    function($scope, $rootScope, AttachImage, Events, $stateParams, $state, FeedsList, 
        CurrentUser, AlbumsService){

        $scope.attachService = AttachImage;
        $scope.data = {};
        $scope.show = false;
        $scope.percent = 0;
        $scope.needAlbum = false;
        $scope.hiddenMode = false;


        var nextState;
        var nextStateParams;


        var mode, id;


        //image service interface
        angular.extend($scope, {
            startUpload : function(){
                $scope.$apply(function(){
                    $scope.showLoader = true;
                    $scope.show = true;
                    $scope.data = {};
                });
            },
            setUploadPercent : function(percent){
                $scope.$apply(function(){
                    $scope.percentComplete = percent;
                    $scope.progressStyle = {'width': percent+'%'};
                });
            },
            uploadCompleate : function(imageData) {
                $scope.$apply(function(){
                    $scope.showLoader = false;
                    //$scope.progressStyle = {'display':'none'};
                    $scope.loadingProcess = {'display':'none'};
                    $scope.data = imageData;

                });
            },
            setNeedAlbum: function(needAlbum){
                $scope.needAlbum = needAlbum;
                if (needAlbum){
                    AlbumsService.getList().success(function(data){
                        $scope.albumsList = AlbumsService.list;
                    });
                }
            },
            setNextState: function(state, params){
                nextState = state;
                nextStateParams = params;
            }
        });

        $scope.hideLoader = function(){
            $scope.showLoader = false;
            $scope.progressStyle = {'display':'none'};
            $scope.loadingProcess = {'display':'none'};
        };

        $scope.onOpen = function(){
            mode = $stateParams.mode;
            $scope.mode = mode;
            id = $stateParams.id;
            if (mode === 'feed'){
                $scope.show = true;
                var feed = FeedsList.getFeedWithId(id);
                $scope.data = feed.image;
                $scope.hideLoader();
                //redirect back to viewer
                $scope.close = function(){
                    //$scope.show = false;
                    $state.go('imageModal',{'id':feed.id});
                };
            } else if (mode === 'album'){
                $scope.show = true;
                var feed = FeedsList.getFeedWithId(id);
                $scope.data = feed.image;
                $scope.hideLoader();
            }
        };

        AttachImage.setControllerScope($scope);



        $scope.close = function(nextStateForce, nextStateParamsForce){
            //$scope.show = false;
            //$state.go('main');
            if (nextStateForce){
                $state.go(nextStateForce, nextStateParamsForce);
            } else if (nextState) {
                $state.go(nextState, nextStateParams);
            }
            else if ($rootScope.$previousState){
                $state.go($rootScope.$previousState, $rootScope.$previousState.params);
            } else {
                $state.go('main');
            }
        };

        $scope.remove = function(){

            if (mode === 'feed' )
            {
                FeedsList.deleteFeed(id);
                $scope.close();
            } else if (mode === 'album')
            {
                FeedsList.deleteFeed(id);
                $scope.close('photoInAlbum', {'albumId': $stateParams.albumId});
                AlbumsService.getList(CurrentUser.id);
            }


        };

        $scope.ok = function(){
            AttachImage.ok();
            AlbumsService.getList(CurrentUser.id);
        };


        var listener = new window.keypress.Listener();

        listener.simple_combo("escape", function() {
            $scope.close();
        });

        //TODO FIX THIS SHIT

        $('.create-alb').find('.arr').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).parents('.create-alb').removeClass('active');
                $(this).parents('.create-alb').find('.create-alb-select').slideUp('fast');
            } else {
                $(this).addClass('active');
                $(this).parents('.create-alb').addClass('active');
                $(this).parents('.create-alb').find('.create-alb-select').slideDown('fast');
            }
        });

        $scope.setAlbum = function(album){
           
            $scope.data.albumName = $scope.albumSelected || false;
            //$scope.data.albumId = album.id;
            
            
            
            $('.create-alb').removeClass('active');
            $('.create-alb-select').slideUp('fast');
            $('.arr').removeClass('active');
        }

        /*
        $('.create-alb').find('.name').live('click', function () {

            var valInput = $(this).find('.loader-album-name').text().replace(/^\s+|\s+$/g, '');;
            var valId =  $(this).find('.loader-album-id').text().replace(/^\s+|\s+$/g, '');;
            console.log(valId);
            $(this).parents('.create-alb').find('input').attr('value', valInput);
            $(this).parents('.create-alb').find('.create-alb-select').slideUp('fast');
            $(this).parents('.create-alb').find('.arr').removeClass('active');
            $(this).parents('.create-alb').removeClass('active');
            $scope.data.albumName = valInput;
            $scope.data.albumId = valId;
        });
        */


    }])