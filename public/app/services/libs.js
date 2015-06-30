'use strict';

angular.module('Yeopen')

.service('Libs',
    function() {
        return {
            shuffle: function(data) {
                for (var j, x, i = data.length; i; j = Math.floor(Math.random() * i), x = data[--i], data[i] = data[j], data[j] = x);
                return data;
            }
        }
    }
);