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
        this.shape = new Polygon(level.initialShape.position, level.initialShape.points, { fillColor: level.initialShape.color });
        this.phase = 0;
        this.initTime = new Date();
        this.gameContainer.addChildAt(this.shape.getGraphics(), 0);
        this.gameContainer.addChild(this.mold.getGraphics());
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
            fillColor : phase.color,
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
        this.checkEnd();
        this.renderer.render(this.gameContainer);
        requestAnimationFrame(this.animate.bind(this));
        return this;
    }

    renderTimer() {

        var now = new Date();
        this.time = (now.getTime() - this.initTime.getTime() )/1000;

        var initSector = (color) => {
            var sector = new PIXI.Graphics();
            sector.clear();
            sector.beginFill(color);
            sector.position.x = 600;
            sector.position.y = 100;
            sector.moveTo(0, 0);
            this.gameContainer.addChild(sector);
            this.sectors.push(sector);
            return sector;
        }

        _.each(this.sectors, (sector) => {
            this.gameContainer.removeChild(sector);
        });

        this.sectors = [];


        var level = levels[this.level];

        var angle = 0;
        var offsetAngle = - Math.PI /2;

        var levelTime = _.reduce(level.phases, function(sum, phase) {
            return sum + phase.time;
        }, 0);

        var pastTime = 0;
        for (var i = 0; i < this.phase; i++) {

            var phase = level.phases[i];
            var initAngle = angle;
            angle += ((pastTime + phase.time)/levelTime) * 2 * Math.PI;
            pastTime += phase.time;
            initSector(phase.color).arc(0, 0, 70, offsetAngle + initAngle, offsetAngle + angle);
        }
        var finalAngle = ((this.time + pastTime)/levelTime) * 2 * Math.PI;

        initSector(level.phases[this.phase].color).arc(0, 0, 70, offsetAngle + angle, offsetAngle + finalAngle);
    }

    checkEnd() {
        var level = levels[this.level];
        var phase = level.phases[this.phase];
        if (this.time >= phase.time) {
            if (this.phase == level.phases.length - 1) {
                if (this.level == levels.length - 1) {
                    //console.log('end game');
                } else {
                    this.level ++;
                    console.log('new level');
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

    }
}
