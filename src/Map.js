var RC = (function(RC) {
    'use strict';

    RC.Map = function (width, height) {
        var map = [];

        function init() {
            for (var i = 0, len = width * height; i < len; i++) {
                map[i] = 0;
            }
        }

        if (arguments.length >= 2) {
            init();
        }

        return {
            clear: init,

            get: function (x, y) {
                if (x >= 0 && x < width && y >= 0 && y < height) {
                    return map[y * width + x];
                }
            },

            load: function (mapArr) {
                map = mapArr;
                return this;
            },

            width: function () {
                return width;
            },

            height: function () {
                return height;
            }
        };
    };

    return RC;
})(RC || {});

