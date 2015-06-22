'use strict'

angular.module('Yeopen')

    .factory('AlbumsService', function($rootScope, Events, Routes, $http, $state, CurrentUser, AbstractService){


    var AbstractService = function(route){
        this.list = [];
        this.route = route;
        this.childrens = [];
    }


    angular.extend(AbstractService.prototype, {

        getList: function(userId) {
            var that = this;
            return $http(this.route.list(userId)).success(function(data) {
                that.list = data.list;
            });
        },

        getWithId: function(id){
            var result = _.find(this.list, function(element){
                if (element['id'] == id) {
                    return true;
                }   
            });
            return result;
        },
              
        getChildrens: function(parendId){
            var that = this;
            return $http(this.route.childrens(parendId)).success(function(data) {
                that.childrens = data.list;
            });
        },

        findWithTitle: function(title){
            var album = _.find(this.list, function(album){
                //console.log(album.title, title);
                if (title == album.title){
                    //console.log('========')
                    return album;
                }
            });
            //console.log(album,'============');
            return album;
        },

        delete: function(albumId, userId){
            var that = this;
            return $http(that.route.remove(albumId)).success(function(){
                //TODO Лишний запрос
                that.getList(userId);
            });
        },
        edit: function(albumData, userId){
            var album = this.getWithId(albumData.id);
            var that = this;
            this.getList(userId).success(function(){
                var newTitle = albumData['title'];
                if (that.findWithTitle(newTitle)){
                    var i=1;
                    var titleWithNum;
                    while ((titleWithNum = newTitle + '_' + i) && that.findWithTitle(titleWithNum) ){
                        i++;
                    }
                    newTitle = titleWithNum;
                   
                }
                albumData['title'] = newTitle;
                $http(that.route.edit(albumData)).success(function(){
                    album['title'] = newTitle;
                    //TODO лишний запрос
                    that.getList(userId);
                });
            });
       
        },

        incrementViews: function(imageId){
            var that = this;
            return $http(that.route.incrementViews(imageId));
        }
        
        });

    
    var albums = new AbstractService(Routes.albums);
    
    albums.getList(CurrentUser.id);

    return albums;
});