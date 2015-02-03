var map = new Map(10, 10).load([
  4,4,4,4,4,4,4,4,4,4,
  4,0,0,0,0,0,0,0,0,4,
  4,0,6,0,6,6,6,6,0,4,
  4,0,6,0,0,0,0,6,0,4,
  4,0,6,6,6,6,0,6,0,4,
  4,0,6,0,0,0,0,6,0,4,
  4,0,6,6,0,6,6,6,0,4,
  4,0,0,0,0,6,0,0,0,4,
  4,0,0,0,0,0,0,4,4,4,
  4,4,4,4,4,4,4,4,4,4
]);

var
  res = new Res('map.png', 64, run),
  player = new Player(64 * 1.5, 64 * 1.5, 0),
  debugScr = new DebugScr(200, 200, map, player, 64),
  gameScr = new GameScr(320, 240, res, 64, true),
  render = new Render(map, player, 64, debugScr);



var time;
function run() {
  var renderRes;
  requestAnimationFrame(run);

  var
    now = new Date().getTime(),
    dt = now - (time || now);

  time = now;

  movePlayer(dt);
  debugScr.draw();
  renderRes = render.cast(player.x(), player.y(), player.dir());

  gameScr.render(renderRes);

  //setTimeout(run, 40);

}
/*************************************************************/

debugScr.appendTo(document.body);
gameScr.appendTo(document.body);


//--------

var
  UP_KEY = false, //38
  DOWN_KEY = false, // 40
  LEFT_KEY = false, //37
  RIGHT_KEY = false; //39

document.documentElement.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 37:
      LEFT_KEY = true;
      break;
    case 38:
      UP_KEY = true;
      break;
    case 39:
      RIGHT_KEY = true;
      break;
    case 40:
      DOWN_KEY = true;
      break;
  }
});

document.documentElement.addEventListener('keyup', function(e) {
  switch (e.keyCode) {
    case 37:
      LEFT_KEY = false;
      break;
    case 38:
      UP_KEY = false;
      break;
    case 39:
      RIGHT_KEY = false;
      break;
    case 40:
      DOWN_KEY = false;
      break;
  }
});

function normalize(rad) {
  var TWO_PI = Math.PI * 2;
  return rad - TWO_PI * Math.floor((rad + Math.PI) / TWO_PI)
}

function movePlayer(dt) {
  var
    SPEED = 0.1 * dt,
    ROT_SPEED = 0.0025 * dt,
    playerX = player.x(),
    playerY = player.y(),
    newX, newY,
    playerDir = player.dir();

  // if(worldMap[int(posX + dirX * moveSpeed)][int(posY)] == false) posX += dirX * moveSpeed;
  //if(worldMap[int(posX)][int(posY + dirY * moveSpeed)] == false) posY += dirY * moveSpeed;

  if (UP_KEY) {
    newX = playerX + Math.cos(playerDir)*SPEED;
    newY = playerY + Math.sin(playerDir)*SPEED;

    if (!map.get(Math.floor(newX / 64), Math.floor(playerY / 64))) {
      player.x(newX);
    }

    if (!map.get(Math.floor(playerX / 64), Math.floor(newY / 64))) {
      player.y(newY);
    }
  }

  if (DOWN_KEY) {
    newX = playerX - Math.cos(playerDir)*SPEED;
    newY = playerY - Math.sin(playerDir)*SPEED;

    if (map.get(Math.floor(newX / 64), Math.floor(playerY / 64))) {
      player.x(newX);
    }

    if (map.get(Math.floor(playerX / 64), Math.floor(newY / 64))) {
      player.y(newY);
    }
  }

  if (LEFT_KEY) {
    player.dir(normalize(playerDir - ROT_SPEED));
  }

  if (RIGHT_KEY) {
    player.dir(normalize(playerDir + ROT_SPEED));
  }
}