(function (RC) {
    'use strict';

    var MAP_DATA = new RC.Map(10, 10).load([
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 6, 0, 6, 6, 6, 6, 0, 4,
      4, 0, 6, 0, 0, 0, 0, 6, 0, 4,
      4, 0, 6, 6, 6, 6, 0, 6, 0, 4,
      4, 0, 6, 0, 0, 0, 0, 6, 0, 4,
      4, 0, 6, 6, 0, 6, 6, 6, 0, 4,
      4, 0, 0, 0, 0, 6, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 4, 4, 4,
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4
    ]);

    var textures = new RC.Resource('res/map.png', 64, gameLoop),
        player = new RC.Player(64 * 1.5, 64 * 1.5, 0),
        debugScreen = new RC.DebugScr(320, 320, MAP_DATA, player, 64),
        gameScreen = new RC.GameScr(320, 240, textures, 64, true),
        renderer = new RC.Renderer(MAP_DATA, player, 64, debugScreen),
        time = 0;
    
    /*************************************************************************/

    debugScreen.appendTo(document.querySelector('#debugContainer'));
    gameScreen.appendTo(document.querySelector('#gameContainer'));
    
    /*************************************************************************/

    // requestanimationframe polyfill
    (function() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    })();

    function gameLoop() {
        var renderResult;
        requestAnimationFrame(gameLoop); //TODO

        var now = new Date().getTime(),
            dt = now - (time || now);

        time = now;

        movePlayer(dt);
        debugScreen.draw();

        renderResult = renderer.cast(player.x(), player.y(), player.dir());
        gameScreen.render(renderResult);
    }

    /******************************** Controls *******************************/

    var
        UP_KEY = false,     // keyCode = 38
        DOWN_KEY = false,   // keyCode = 40
        LEFT_KEY = false,   // keyCode = 37
        RIGHT_KEY = false;  // keyCode = 39

    document.documentElement.addEventListener('keydown', function (e) {
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

    document.documentElement.addEventListener('keyup', function (e) {
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
        var SPEED = 0.06 * dt,
            ROT_SPEED = 0.0025 * dt,
            playerX = player.x(),
            playerY = player.y(),
            newX, newY,
            playerDir = player.dir();

        if (UP_KEY) {
            newX = playerX + Math.cos(playerDir) * SPEED;
            newY = playerY + Math.sin(playerDir) * SPEED;

            if (!MAP_DATA.get(Math.floor(newX / 64), Math.floor(playerY / 64))) {
                player.x(newX);
            }

            if (!MAP_DATA.get(Math.floor(playerX / 64), Math.floor(newY / 64))) {
                player.y(newY);
            }
        }

        if (DOWN_KEY) {
            newX = playerX - Math.cos(playerDir) * SPEED;
            newY = playerY - Math.sin(playerDir) * SPEED;

            if (MAP_DATA.get(Math.floor(newX / 64), Math.floor(playerY / 64))) {
                player.x(newX);
            }

            if (MAP_DATA.get(Math.floor(playerX / 64), Math.floor(newY / 64))) {
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


    document.querySelector('#fullScrCb').addEventListener('change', function() {
        document.querySelector('#gameContainer').classList.toggle('full-scr');
    });
})(RC);