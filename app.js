var map = new Map(20, 20).load([
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]);

var
  res = new Res('map.png', 64, run),
  player = new Player(64 * 9, 64 * 11, 0),
  debugScr = new DebugScr(200, 200, map, player, 64),
  render = new Render(map, player, 64, debugScr);


function run() {
  movePlayer();
  debugScr.draw();
  render.cast(player.x(), player.y(), player.dir());

  setTimeout(run, 50);
}
/*************************************************************/

debugScr.appendTo(document.body);

run();

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

function movePlayer() {
  var SPEED = 3,
    playerX = player.x(),
    playerY = player.y(),
    playerDir = player.dir();

  if (UP_KEY) {
    playerX += Math.cos(playerDir)*SPEED;
    playerY += Math.sin(playerDir)*SPEED;
  }

  if (DOWN_KEY) {
    playerX -= Math.cos(playerDir)*SPEED;
    playerY -= Math.sin(playerDir)*SPEED;
  }

  if (LEFT_KEY) {
    playerDir -= 0.1;
  }

  if (RIGHT_KEY) {
    playerDir += 0.1;
  }

  playerDir = normalize(playerDir);

  player.x(playerX).y(playerY).dir(playerDir);
}