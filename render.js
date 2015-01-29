function Render(map, player, wallSize, debugScr) {

  var
    mapWidth = map.width()-1,
    mapHeight = map.height()-1;

  wallSize = wallSize || 64;

  function getCell(x, y) {
    var
      cellX = parseInt(x / wallSize),
      cellY = parseInt(y / wallSize);

    return map.get(cellX, cellY);
  }

  function normalize(rad) {
    var TWO_PI = Math.PI * 2;
    return rad - TWO_PI * Math.floor((rad + Math.PI) / TWO_PI);
  }
  
  function getIntersection(playerX, playerY, playerDir) {
    var
      ax, ay, aStepX, aStepY,
      bx, by, bStepX, bStepY,
      cellX, cellY,
      hLen = Infinity, vLen = Infinity;

    if (playerDir !== 0 && playerDir !== Math.PI * 2) {
      var tmp = 0;
      if (playerDir < 0) { // ray is facing up
        ay = Math.floor(playerY / wallSize) * wallSize;
        tmp = -1;
        aStepX = -wallSize / Math.tan(playerDir);
        aStepY = -wallSize;
      } else { //ray is facing down
        ay = Math.floor(playerY / wallSize) * wallSize + wallSize;
        aStepX = wallSize / Math.tan(playerDir);
        aStepY = wallSize;
      }

      ax = playerX - (playerY - ay) / Math.tan(playerDir);

      if (getCell(ax, ay+tmp)) {
        hLen = Math.sqrt( Math.pow(playerX - ax, 2) + Math.pow(playerY - ay, 2) );
      } else {
        while (true) {
          ax = ax + aStepX;
          ay = ay + aStepY;

          cellX = parseInt(ax / wallSize);
          cellY = parseInt((ay+tmp) / wallSize);

          if (cellX < 0 || cellX > mapWidth || cellY < 0 || cellY > mapHeight) {
            break;
          }

          if (getCell(ax, ay+tmp)) {
            hLen = Math.sqrt( Math.pow(playerX - ax, 2) + Math.pow(playerY - ay, 2) );
            break;
          }
        }
      }
    }


    if (playerDir !== -Math.PI / 2 || playerDir !== Math.PI / 2) {
      var tmp = 0;
      if (playerDir > -Math.PI / 2 && playerDir < Math.PI / 2) { // ray is facing right
        bx = Math.floor(playerX / wallSize) * wallSize + wallSize;
        bStepX = wallSize;
        bStepY = wallSize * Math.tan(playerDir);
      } else { // ray is facing left
        bx = Math.floor(playerX / wallSize) * wallSize;
        tmp = -1;
        bStepX = -wallSize;
        bStepY = -wallSize * Math.tan(playerDir);
      }

      by = playerY - (playerX - bx) * Math.tan(playerDir);

      if (getCell(bx+tmp, by)) {
        vLen = Math.sqrt( Math.pow(playerX - bx, 2) + Math.pow(playerY - by, 2) );
      } else {
        while (true) {
          bx = bx + bStepX;
          by = by + bStepY;

          cellX = parseInt((bx+tmp) / wallSize);
          cellY = parseInt(by / wallSize);

          if (cellX < 0 || cellX > mapWidth || cellY < 0 || cellY > mapHeight) {
            break;
          }

          if (getCell(bx+tmp, by)) {
            vLen = Math.sqrt( Math.pow(playerX - bx, 2) + Math.pow(playerY - by, 2) );
            break;
          }
        }
      }
    }

    if (debugScr) {
      if (hLen > vLen) {
        debugScr.dot(bx, by);
      } else {
        debugScr.dot(ax, ay);
      }
    }

    return {
      distance : hLen > vLen ? vLen : hLen,
      //textureId : map.get(parseInt(x / wallSize), parseInt(y / wallSize)),
      textureCol : hLen > vLen ? Math.floor(by % wallSize) : Math.floor(ax % wallSize)
    };
  }


  return {
    cast : function () {
      var
        playerX = player.x(),
        playerY = player.y(),
        playerDir = player.dir(),
        dir = playerDir - 0.52,
        step = 1.04 / 320,
        len, result = [];

      for (var i = 0; i < 320; i++) {
        len = getIntersection(playerX, playerY, normalize(dir));

        len.distance *= Math.cos(playerDir - dir);

        result.push(len);
        dir += step;
      }

      return result;
    }
  };
}