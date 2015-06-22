    'use strict';
angular.module('Yeopen')
    .factory('MessagesService', function(AbstractService, Events, Routes, $http ){


        var applicationsService = new AbstractService(Routes.messages);
        
        applicationsService.messagesList = [];
        var Methods = {
            loadingInProgress: false,
            loadingEnabled: false,
            runGetCountData: function() {
                var that = this;
                if (!that.loadingEnabled){
                    that.getUnreadCount();
                    that.loadingEnabled = true;
                    setInterval(function(){
                        if (!that.loadingInProgress){
                            that.loadingInProgress = true;
                            that.getUnreadCount().then(function(){
                                that.loadingInProgress = false;  
                            });
                        }
                    }, 3000);
                }
            },
            getList: function(data) {
                var that = this;
                return $http(this.route.list(data)).success(function(data) {
                    that.list = data.list;
                });
            },
            accept: function(applicationId) {
                return this.createMethod('accept')(applicationId);
            },
            delay: function(applicationId) {
                return this.createMethod('delay')(applicationId);
            },
            messages: function (receiverUserId, messageDir) {
                var that = this;
                return this.createMethod('childrens')({receiver_user_id: receiverUserId, messages_dir: messageDir}).success(function(data){
                        if (data['dialog']){
                            that.messagesList = data.dialog.messages;
                        }
                    }
                )
            },
            create: function (data) {
                var that = this;
                return this.createMethod('create')(data).success(function(data){
                        that.messagesList.push(data.message);
                    }
                )
            },
            getUnreadCount: function () {
                var that = this;
                return this.createMethod('unreadCount')().success(function(data){
                        that.unreadCount = data['count'];
                        //that.messagesList.push(data.message);
                    }
                )
            },
            deleteMessage: function (messageId) {
                var that = this;
                return this.createMethod('deleteMessage')(messageId).success(function(data){
                    for (var i in that.messagesList) {
                        var message = that.messagesList[i];
                        if (message.id == messageId){
                            that.messagesList[i]['status']['removeMessageItSelf'] = true;
                        }
                    }
                })
            },
            restoreDialog: function (dialogId) {
                var that = this;
                return this.createMethod('restoreDialog')(dialogId).success(function(data){
                   
                });
            },
            
            deleteAllMessages: function () {
                var that = this;
                return this.createMethod('removeAllMessages')().success(function(data){
                    that.getList();
                });
            }
        };
        angular.extend(applicationsService, Methods);



        return applicationsService;
    })
