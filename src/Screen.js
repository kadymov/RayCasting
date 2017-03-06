var RC = (function(RC) {
    'use strict';

    RC.Screen = function (width, height) {
        var canvas = document.createElement('canvas'),
            ctx;

        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext('2d');

        ctx.translate(0.5, 0.5);

        return {
            clear: function (x, y, w, h) {
                x = x || 0;
                y = y || 0;
                w = w || width;
                h = h || height;

                ctx.clearRect(x, y, w, h);
            },

            rect: function (x, y, w, h, color, strokeWidth, strokeColor) {
                x = x || 0;
                y = y || 0;
                w = w || width;
                h = h || height;
                color = color || 'black';
                strokeWidth = strokeWidth || 0;
                strokeColor = strokeColor || '';

                ctx.save();
                ctx.fillStyle = color;
                ctx.strokeWidth = strokeWidth;
                ctx.strokeStyle = strokeColor;
                ctx.fillRect(x, y, w, h);
                ctx.restore();
            },

            text: function (str, x, y, color) {
                x = x || 0;
                y = y || 0;
                ctx.save();
                ctx.fillStyle = color;
                ctx.fillText(str, x, y);
                ctx.restore();
            },

            line: function (x0, y0, x1, y1, color, lw) {
                color = color || 'black';
                lw = lw || 1;

                ctx.save();
                ctx.strokeStyle = color;
                ctx.lineWidth = lw;

                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();

                ctx.restore();
            },

            image: function (img, sx, sy, sw, sh, dx, dy, dw, dh) {
                ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
            },

            appendTo: function (container) {
                container.appendChild(canvas);
            }
        };
    };

    return RC;

})(RC || {});