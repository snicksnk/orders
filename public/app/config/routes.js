'use strict';
define(['jquery'], function($) {
    return {
        orders: {
            'list': function () {
                return {
                    url: 'api.php?module=orders&controller=index',
                    method: 'get'
                }
            },
            'search': function (params) {
                return {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'api.php?module=orders&controller=index',
                    method: 'post',
                    data: $.param(params),
                    url: 'api.php?module=orders&controller=index&action=add',
                    withParams: true
                }
            },
            'add': function (orderData) {
                orderData['_entity_name'] = 'order';
                orderData['goods']['_entity_related'] = {
                    name:'good',
                    type:'one_to_many',
                };
                console.log(orderData);
                return {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    method: 'post',
                    data: $.param({'_entity':orderData}),
                    url: 'api.php?module=orders&controller=index&action=add',
                    withParams: true
                }
            },
            'delete': function (id) {
                return {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'api.php?module=orders&controller=delete',
                    method: 'post',
                    data: $.param({'id':id}),
                    url: 'api.php?module=orders&controller=index&action=delete',
                    withParams: true
                }
            },
        },
        goods: {
            'getByImageUrl': function (imageUrl) {
                return {
                    url: 'api.php?module=orders&controller=index&action=getGood&imgUrl='+imageUrl,
                    method: 'get'
                }
            }
        }
    };
});