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
        this.renderer = PIXI.autoDetectRenderer(800, 600);
        // create an empty container
        this.gameContainer = new PIXI.Container();
        // add the renderer view element to the DOM
        document.body.appendChild(this.renderer.view);
        this.tool = new Polygon([0, 0], [[0, 0], [0, 50], [50, 50], [50, 0]], {
            fill : colors.primary,
            fillAlpha : 0.5,
            center: [25, 25],
        });
        this.setUpEvents();
    }

    setUpEvents() {
        this.renderer.view.addEventListener('click', event => {
            var x = event.pageX - $(this.renderer.view).offset().left;
            var y = event.pageY - $(this.renderer.view).offset().top;
            this.shape.subtract(this.tool);
        });
    }

    preload() {
        this.onLoad();
    }

    animate() {
        this.renderMouse();
        this.renderer.render(this.gameContainer);
        requestAnimationFrame(this.animate.bind(this));
        //allow chain calling
        return this;
    }

    renderMouse() {
        this.tool.moveTo([this.renderer.plugins.interaction.mouse.global.x, this.renderer.plugins.interaction.mouse.global.y]);
    }

    onLoad() {
        this.renderer.backgroundColor = colors.background;

        this.shape = new Polygon([100, 100], [[0, 0], [0, 100], [100, 100], [100, 0]]);
        //var polygon2 = new Polygon([150, 150], [[0, 0], [150, 0], [150, 150], [0, 150]]);
        //polygon.subtract(polygon2);
        this.gameContainer.addChild(this.shape.getGraphics());
        this.gameContainer.addChild(this.tool.getGraphics());
    }
}
