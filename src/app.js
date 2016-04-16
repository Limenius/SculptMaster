//require('./styles/style.scss');
var PIXI = require('pixi.js')
import Polygon from './polygon';
import colors from './colors';


window.onload = function ()
{
    var game = new Prakoto();
    game.preload();
    game.animate();
};

class Prakoto {
    constructor() {
        this.renderer = PIXI.autoDetectRenderer(640,480);
        // create an empty container
        this.gameContainer = new PIXI.Container();
        // add the renderer view element to the DOM
        document.body.appendChild(this.renderer.view);
    }

    preload() {
        this.onLoad();
    }

    animate() {
        this.renderer.render(this.gameContainer);
        requestAnimationFrame(this.animate.bind(this));
        //allow chain calling
        return this;
    }

    onLoad() {
        this.renderer.backgroundColor = colors.background;

        var polygon = new Polygon([100, 100], [[100, 0], [100, 100], [0, 100]]);
        polygon.subtract(new Polygon([150, 150], [[150, 0], [150, 150], [0, 150]]));
        this.gameContainer.addChild(polygon.getGraphics());
    }
}
