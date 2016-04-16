var PIXI = require('pixi.js');
import colors from './colors';
var ClipperLib = require('js-clipper');

export default class Polygon {
    constructor(position, points, options) {

        // set the line style to have a width of 5 and set the color to red

        var [positionX, positionY] = position;
        this.positionX = positionX;
        this.positionY = positionY;
        this.points = [];

        _.each(points, ([pointX, pointY]) => {
            this.points.push([pointX, pointY]);
        });

        this.options = _.defaults(options, {
            fillColor: colors.primary,
            fillAlpha: 1,
            center: [0, 0],
        })
        this.graphics = new PIXI.Graphics();
        this.render();
    }

    render() {
        this.graphics.clear();
        this.graphics.position.x = this.positionX;
        this.graphics.position.y = this.positionY;

        this.graphics.beginFill(this.options.fillColor, this.options.fillAlpha);
        this.graphics.lineStyle(5, colors.secondary);
        var [centerX, centerY] = this.options.center;
        this.graphics.moveTo(this.points[0][0] - centerX, this.points[0][1]- centerY);
        for (var i = 1; i < this.points.length; i++) {
            var [pointX, pointY] = this.points[i];
            this.graphics.lineTo(pointX - centerX, pointY - centerY);
        }
    }

    moveTo([x, y]) {
        this.positionX = x;
        this.positionY = y;
        this.graphics.position.x = x;
        this.graphics.position.y = y;
    }

    subtract(clip) {
        var absoluteClipPoints = clip.points.map(([x, y]) => {
            return {X: x + clip.positionX, Y: y + clip.positionY};

        });
        var absolutePoints = this.points.map(([x, y]) => {
            return {X: x, Y: y};
        });
        var clipper = new ClipperLib.Clipper();

        clipper.AddPaths([absolutePoints], ClipperLib.PolyType.ptSubject, true);
        clipper.AddPaths([absoluteClipPoints], ClipperLib.PolyType.ptClip, true);
        var cliptype = ClipperLib.ClipType.ctDifference;
        var polyfilltype = ClipperLib.PolyFillType.pftPositive;
        var result = new ClipperLib.Paths();
        clipper.Execute(cliptype, result);

        var processedResult = result[0].map((point) => {
            return [point.X, point.Y];
        });
        this.points = processedResult;
        this.render();
    }

    getGraphics() {
        return this.graphics;
    }
}
