'use strict'

angular.module('Yeopen')

.factory('AttachImage', function(BackendService, $rootScope, Events, Routes, $http, $state ){

    var AttachImage = function() {

        var $controllerScope;
        var responseData = {}


        var successCallback = function () {
            console.log('default successCallback');
        };


        var defaultConfig = {
            'currentHref':{state:'editImage', params:{'id': 'null', 'mode':'attach'}},
            'completeCallback':successCallback,
            'nextStateName':null,
            'nextStateParams':null,
            'needAlbum':false,
            'hiddenMode':false,
            'percentCallback':false
        };

        var that = this;


        this.currentConfig = defaultConfig;
        
        

        var shitLoader = function() {

            //var bar = $('.bar');
            //var percent = $('.percent');
            //var status = $('#status');
            var form = $('#upload-image-form');

            //console.log(that.currentConfig.currentHref.state, that.currentConfig.currentHref.params);
            if (that.currentConfig.currentHref.state){
                $state.go(that.currentConfig.currentHref.state, that.currentConfig.currentHref.params);
            } else {
                
            }

            var dropboxCallback = function(){
                
                var ajaxFormEvents = {
                    beforeSend: function() {
                        $controllerScope.startUpload();
                        $controllerScope.setUploadPercent(0);
                        $controllerScope.setNeedAlbum(that.currentConfig.needAlbum);
                        $controllerScope.setNextState(
                            that.currentConfig.nextStateName, 
                            that.currentConfig.nextStateParams);
                    },
                    uploadProgress: function(event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        //bar.width(percentVal);

                        if (that.currentConfig.percentCallback){
                            that.currentConfig.percentCallback(percentComplete);
                        }

                        $controllerScope.setUploadPercent(percentComplete);

                        //$('#img-upload-progress-bar-1').css('width',1.55*percentComplete+'px');
                    },
                    complete: function(xhr) {

                        var response = jQuery.parseJSON(xhr.responseText);
                        responseData = response;
                        $controllerScope.uploadCompleate(response);
                        if (that.currentConfig.hiddenMode){
                            $controllerScope.ok();
                        }

                    }
                }
                form.ajaxForm(ajaxFormEvents);
                form.submit();
            };

            $('#dropbox').unbind('change');
            $('#upload-image-form')[0].reset();
            $('#dropbox').change(dropboxCallback);
            $('#dropbox').click();

        };



        this.restoreConfig = function () {
            this.currentConfig = defaultConfig;
        };

        this.setNewConfig = function(newConfig){
            this.currentConfig = angular.extend(defaultConfig, newConfig);
        };

        this.attach = function(callback){
            
            this.restoreConfig();
            //console.log(mode);
            this.setNewConfig({
                'completeCallback':callback
            })
            
            
         
            //successCallback = callback;
            shitLoader();
        };


        this.advancedAttach = function(config) {
            this.restoreConfig();
            //console.log(mode);
            this.setNewConfig(config)
            
            
            //successCallback = callback;
            shitLoader();
        }

        this.setControllerScope = function($scope){
            $controllerScope = $scope;
            $controllerScope.hiddenMode = this.currentConfig.hiddenMode;
        }

        this.ok = function() {

            var imageData = {
                id:$controllerScope.data['id'],
                title:$controllerScope.data['title'],
                description:$controllerScope.data['description'],
                albumName:($controllerScope.data['albumName'] || ''),
                albumId:$controllerScope.data['albumId']
            };
            //var request = angular.extend({}, Routes.saveImageInfo, imageData);

            var that = this;
            $http(Routes.saveImageInfo(imageData)).
            success(function(data){
                imageData['albumId'] = data['albumId'];
          
                that.currentConfig.completeCallback(data);
                $controllerScope.close();
            });

            //successCallback(responseData);
        }

    }

   
    var attacher = new AttachImage();
     

    return attacher;
});