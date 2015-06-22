'use strict';
angular.module('Yeopen')
    .factory('ShareWithFrinedsSvc', function(AbstractService, Events, Routes, $http, FeedsList ){
        
        var Share = function () {
            this.feed;
            this.showModal = false;
        };

        var ShareMethods = {
            setFeedById: function(id) {
                this.feed = FeedsList.getFeedWithId(id);
                this.showModal = true;
            }
            
        };
        
        var share = new Share();
        angular.extend(share, ShareMethods);
        
        console.log(share);
       
        return share;
    });
