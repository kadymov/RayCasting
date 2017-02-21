function DebugScr(width, height, map, player, cellSize) {
    var scr = new Screen(width + 1, height + 1),
        cellWidth = Math.floor(width / map.width()),
        cellHeight = Math.floor(height / map.height());

    function drawGrid() {
        var i;

        for (i = 0; i <= height; i += cellHeight) {
            scr.line(0, i, width, i);
        }

        for (i = 0; i <= width; i += cellWidth) {
            scr.line(i, 0, i, height);
        }
    }

    function drawMap() {
        for (var j = 0, h = map.height(); j < h; j++) {
            for (var i = 0, w = map.width(); i < w; i++) {
                if (map.get(i, j)) {
                    scr.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight)
                }
            }
        }
    }

    function drawPlayer() {
        var x = Math.floor(player.x() / cellSize * cellWidth),
            y = Math.floor(player.y() / cellSize * cellHeight),
            dir = player.dir(),
            nx = x + Math.cos(dir) * 1000,
            ny = y + Math.sin(dir) * 1000;

        scr.line(x, y, nx, ny, '#0f0');
        scr.rect(x - 2, y - 2, 4, 4, '#0f0');
    }

    return {
        appendTo: function (container) {
            scr.appendTo(container);
            return this;
        },

        draw: function () {
            scr.clear();
            drawGrid();
            drawMap();
            drawPlayer();
        },

        dot: function (x, y, col) {
            x = Math.floor(x / cellSize * cellWidth);
            y = Math.floor(y / cellSize * cellHeight),
                scr.rect(x - 1, y - 1, 3, 3, col || 'red');
        }
    };
}