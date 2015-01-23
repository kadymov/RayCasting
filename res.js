function Res(url, spriteSize, onload) {
  spriteSize = 64;
  onload = onload || function () {};

  var
    img = new Image(),
    sprites = [];

  img.onload = function() {
    var 
      tempImg,
      canv = document.createElement('canvas'), 
      ctx;

    canv.width = spriteSize;
    canv.height = spriteSize;
    ctx = canv.getContext('2d');

    for (var j = 0, jlen = Math.floor(img.height / spriteSize); j < jlen; j++) {
      for (var i = 0, ilen = Math.floor(img.width / spriteSize); i < ilen; i++) {
        ctx.clearRect(0, 0, spriteSize, spriteSize);
        ctx.drawImage(img, i*spriteSize, j*spriteSize, spriteSize, spriteSize, 0, 0, spriteSize, spriteSize);

        tempImg = new Image();
        tempImg.src = canv.toDataURL();
        sprites.push(tempImg);
      }
    }

    onload();
  };

  img.src = url;

  return {
    get : function (id) {
      return sprites[id];
    },

    length : function () {
      return sprites.length;
    }
  };
}