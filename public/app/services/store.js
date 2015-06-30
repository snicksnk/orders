'use strict';

angular.module('Yeopen')

.service('StoreService',
    function() {
        var store = [];
        return {
            update: function(accessKey, data) {
                if (store[accessKey])
                    store[accessKey].data = data;
            },
            set: function(accessKey, validateKey, data) {
                store[accessKey] = {
                    validate: validateKey,
                    data: data
                };
            },
            get: function(accessKey, validateKey, force) {
                if (force === true)
                    return store[accessKey] ? store[accessKey].data || [] : []
                else
                    return store[accessKey] && store[accessKey].validate === validateKey ?
                        store[accessKey].data || [] : [];
            }
        }
    }
);