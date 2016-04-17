//require('./styles/style.scss');
var PIXI = require('pixi.js')
import Polygon from './polygon';
import colors from './colors';
import levels from './levels';


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
        this.level = 0;
        this.setupLevel();
        this.setUpEvents();
    }

    setupLevel() {
        this.gameContainer.removeChildren();
        var level = levels[this.level];
        this.mold = new Polygon([400, 200], level.goal, {
            fillColor : colors.tertiary,
            fillAlpha : 1,
            center: [0, 0],
        });
        this.shape = new Polygon(level.initialShape.position, level.initialShape.points);
        this.phase = 0;
        this.initTime = new Date();
        this.setupPhase();
    }

    setupPhase() {
        var phase = levels[this.level].phases[this.phase];
        this.initTime = new Date();
        if (this.tool) {
            this.tool.graphics.clear();
            this.gameContainer.removeChild(this.tool);
        }
        this.tool = new Polygon([0, 0], phase.tool, {
            fillColor : colors.primary,
            fillAlpha : 0.5,
            center: phase.center,
        });
        this.gameContainer.addChild(this.tool.getGraphics());
    }

    setUpEvents() {
        this.renderer.view.addEventListener('click', event => {
            var x = event.pageX - $(this.renderer.view).offset().left;
            var y = event.pageY - $(this.renderer.view).offset().top;
            this.shape.modify(this.tool, levels[this.level].phases[this.phase].type);
        });
    }

    preload() {
        this.onLoad();
    }

    animate() {
        this.renderMouse();
        this.renderTimer();
        this.renderer.render(this.gameContainer);
        requestAnimationFrame(this.animate.bind(this));
        return this;
    }

    renderTimer() {
        var now = new Date();
        var time = Math.floor((now.getTime() - this.initTime.getTime() )/1000);
        this.chrono.text = (Math.floor((now.getTime() - this.initTime.getTime() )/1000));
        var level = levels[this.level];
        var phase = level.phases[this.phase];
        if (time >= phase.time) {
            if (this.phase == level.phases.length - 1) {
                console.log(this.shape.compare(this.mold));
                if (this.level == levels.length - 1) {
                    console.log('end game');
                } else {
                    this.level ++;
                    this.setupLevel();
                }
            } else {
                this.phase ++;
                this.setupPhase();
            }
        }
    }

    renderMouse() {
        var x = this.renderer.plugins.interaction.mouse.global.x;
        var y = this.renderer.plugins.interaction.mouse.global.y;
        x = x - x % 25;
        y = y - y % 25;
        this.tool.moveTo([x, y]);
    }

    onLoad() {
        this.renderer.backgroundColor = colors.background;
        this.gameContainer.addChildAt(this.shape.getGraphics(), 0);
        this.gameContainer.addChild(this.mold.getGraphics());
        this.chrono = new PIXI.Text('', {font : '24px Arial', fill : 0xff1010, align : 'right'});
        this.chrono.x = 400;
        this.chrono.y = 400;
        this.gameContainer.addChild(this.chrono);
    }
}
