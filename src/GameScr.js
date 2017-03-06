var RC = (function(RC) {
    'use strict';

    RC.GameScr = function (width, height, textures, wallSize, showFPC) {
        var scr = new RC.Screen(width, height),
            fpcTime;

        function getFpc() {
            var now = new Date().getTime(),
                dt = now - (fpcTime || now);

            fpcTime = now;

            return Math.floor(1000 / dt);
        }

        return {
            render: function (renderRes) {
                var
                    col,
                    distance,
                    textureId,
                    textureCol,
                    wallHeight,
                    texture,
                    shadow;

                scr.rect();

                for (var i = 0, len = renderRes.length; i < len; i++) {
                    col = renderRes[i];
                    distance = col.distance;
                    textureId = col.textureId - 1;
                    textureCol = col.textureCol;
                    wallHeight = wallSize / distance * 180;
                    texture = textures.get(textureId);

                    if (!texture) continue;

                    scr.image(texture, textureCol, 0, 1, 64, i, 120 - wallHeight / 2, 1, wallHeight);

                    shadow = 0.2 + distance / 200;
                    scr.rect(i - 0.5, 0, 1, height, 'rgba(0, 0, 0, ' + shadow.toFixed(3) + ')');
                }

                if (showFPC) {
                    var fpc = getFpc();
                    scr.text(fpc, 0, 10, 'white');
                }
            },

            appendTo: function (container) {
                scr.appendTo(container);
                return this;
            },

            draw: function () {
                scr.clear();
            }
        };
    };

    return RC;
})(RC || {});
