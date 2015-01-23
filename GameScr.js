function GameScr(width, height, render, textures) {
  var
    WALL_SIZE = 64,

    scr = new Scr(width, height);





  return {
    appendTo : function (container) {
      scr.appendTo(container);
      return this;
    },

    draw : function () {
      scr.clear();
    }
  };
}