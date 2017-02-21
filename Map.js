function Map(width, height) {
    var map = [];

    function init() {
        for (var i = 0, len = width * height; i < len; i++) {
            map[i] = 0;
        }
    }

    return {
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
}