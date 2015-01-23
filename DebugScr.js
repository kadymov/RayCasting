function DebugScr(width, height, map, player) {
  var
    scr = new Scr(width + 1, height + 1),
    cellWidth = Math.floor(width / map.width()),
    cellHeight = Math.floor(height / map.height());

  function drawGrid() {
    var i;

    for (i = 0; i <= height; i += cellHeight) {
      scr.line(0, i, width, i);
    }

    for (i = 0; i <= width; i+= cellWidth) {
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
    //TODO
  }

  return {
    appendTo : function (container) {
      scr.appendTo(container);
      return this;
    },

    draw : function () {
      scr.clear();
      drawGrid();
      drawMap();
      drawPlayer();
    }
  };
}