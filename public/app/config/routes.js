'use strict';

angular.module('Orders')

.constant('Routes', {
    orders: {
        'list': function () {
            return {
                url: '/api.php?module=orders&controller=index',
                method: 'get'
            }
        },
        'add': function (orderData) {
            orderData['_entity_name'] = 'order';
            orderData['goods']['_entity_related'] = {
                name:'good',
                type:'one_to_many',
            };

            return {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                data: $.param({'_entity':orderData}),
                url: '/api.php?module=orders&controller=index&action=add',
                withParams: true
            }
        }
    },
    goods: {
        'getByImageUrl': function (imageUrl) {
            return {
                url: '/api.php?module=orders&controller=index&action=getGood&imgUrl='+imageUrl,
                method: 'get'
            }
        }
    }
});