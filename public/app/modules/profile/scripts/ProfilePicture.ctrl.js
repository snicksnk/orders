
'use strict';

angular.module('Yeopen')
	.controller('ProfilePictureCtrl', ['$scope', '$rootScope', 'AttachImage', 'Events',
		function($scope, $rootScope, AttachImage, Events){
			
		$scope.changeCover = function(){
			AttachImage.advancedAttach(
                            {
                                hiddenMode: true,
                                completeCallback: function(data){
                                    window.location.replace(" /user/profile/changeCover/"+data['id']);
                                }
                            }
                        );
		}

		$scope.changeAvatar = function(){
                        AttachImage.advancedAttach(
                        {
                            hiddenMode: true,
                            completeCallback: function(data){
                                window.location.replace(" /user/profile/changeAvatar/"+data['id']);
                            }
                        });
		}

	}])