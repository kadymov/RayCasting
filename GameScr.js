function GameScr(width, height, textures, wallSize) {
  var
    scr = new Scr(width, height);


  return {
    render : function(renderRes) {
      var
        col,
        distance,
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

        shadow = 0.3 + distance / 200;
        scr.rect(i-0.5, 0, 1, height, 'rgba(0, 0, 0, ' + shadow.toFixed(3) + ')');
      }
    },

    appendTo : function (container) {
      scr.appendTo(container);
      return this;
    },

    draw : function () {
      scr.clear();
    }
  };
}