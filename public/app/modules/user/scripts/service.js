'use strict';


angular.module('Yeopen')
	.factory('CurrentUser', function(){

		//TODO global injection
		var profile = userProfile;
        //var currentUserProfile = currentUserProfile;

        profile.isCurrentUserId = function (userId) {
            var currentUserProfile = this.getLogedInUserProfile();
            if (currentUserProfile['id'] === userId){
                return true;
            }
            return false;
        };
        

        profile.isCurrentUser = function (user){
            return profile.isCurrentUserId(user.id);
        }

        profile.isCurrentUserPage = function(){
            var currentUser = profile;
            return this.isCurrentUser(currentUser);
        }

        profile.getLogedInUserProfile = function (){
            return currentUserProfile;
        }

		return profile;
	});