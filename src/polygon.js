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
        this.graphics.position.x = this.positionX - this.options.center[0];
        this.graphics.position.y = this.positionY - this.options.center[1];

        this.graphics.beginFill(this.options.fillColor, this.options.fillAlpha);
        this.graphics.lineStyle(5, colors.secondary);
        this.graphics.moveTo(this.points[0][0], this.points[0][1]);
        for (var i = 1; i < this.points.length; i++) {
            var [pointX, pointY] = this.points[i];
            this.graphics.lineTo(pointX, pointY);
        }
    }

    moveTo([x, y]) {
        this.positionX = x;
        this.positionY = y;
        this.graphics.position.x = x - this.options.center[0];
        this.graphics.position.y = y - this.options.center[1];
    }

    modify(clip, type) {
        var [clipPositionX, clipPositionY] = [clip.positionX - clip.positionX % 25, clip.positionY - clip.positionY % 25];
        var absoluteClipPoints = clip.points.map(([x, y]) => {
            return {X: x + clipPositionX - clip.options.center[0], Y: y + clipPositionY - clip.options.center[1]};

        });
        var absolutePoints = this.points.map(([x, y]) => {
            return {X: x + this.positionX, Y: y + this.positionY};
        });
        var clipper = new ClipperLib.Clipper();

        clipper.AddPaths([absolutePoints], ClipperLib.PolyType.ptSubject, true);
        clipper.AddPaths([absoluteClipPoints], ClipperLib.PolyType.ptClip, true);
        var cliptype;
        switch (type) {
            case 'subtract':
                cliptype = ClipperLib.ClipType.ctDifference;
                break;
            case 'add':
                cliptype = ClipperLib.ClipType.ctUnion;
                break;
        }
        var polyfilltype = ClipperLib.PolyFillType.pftPositive;
        var result = new ClipperLib.Paths();
        clipper.Execute(cliptype, result);

        var processedResult = result[0].map((point) => {
            return [point.X - this.positionX, point.Y - this.positionY];
        });
        this.points = processedResult;
        this.render();
    }

    getGraphics() {
        return this.graphics;
    }

    print(points) {
        var str = '';
        _.each(points, point => {
            str = str + '('+point[0] + ', ' + point[1] + ')';
        });
        console.log(str);
    }

    compare(polygon) {
        console.log("Points1");
        console.log(this.points);
        console.log("Points2");
        console.log(polygon.points);
        console.log("XOR");
        console.log(_.xorWith(this.points, polygon.points));
        return _.isEmpty(_.xorWith(this.points, polygon.points, (a, b) => {
            return (a[0] == b[0] && a[1] == b[1]);
        }));
    }
}
