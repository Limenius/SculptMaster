var PIXI = require('pixi.js');
var polygonBoolean = require('2d-polygon-boolean');
import colors from './colors';

export default class Polygon {
    constructor(offset, points) {

        // set the line style to have a width of 5 and set the color to red

        var [offsetX, offsetY] = offset;
        this.points = [];
        this.points.push([offsetX, offsetY]);

        _.each(points, ([pointX, pointY]) => {
            var x = offsetX + pointX;
            var y = offsetY + pointY;
            this.points.push([x, y]);
        });
        this.render();
    }

    render() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(colors.primary);
        this.graphics.lineStyle(5, colors.secondary);
        var [offsetX, offsetY] = this.points[0];
        this.graphics.moveTo(offsetX, offsetY);
        for (var i = 1; i < this.points.length; i++) {
            var [pointX, pointY] = this.points[i];
            this.graphics.lineTo(pointX, pointY);
        }
    }

    subtract(clip) {
        this.points = polygonBoolean(this.points, clip.points, 'not')[0];
        this.render();
    }

    getGraphics() {
        console.log(this.points);
        return this.graphics;
    }
}
