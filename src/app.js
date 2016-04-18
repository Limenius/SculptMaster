require('./styles/style.scss');
var PIXI = require('pixi.js')
import Polygon from './polygon';
import colors from './colors';
import levels from './levels';
import LevelPresentation from './levelPresentation';
import EndGame from './endGame';
import {initSector} from './sector';
import Sound from './sound';

window.onload = function ()
{
    var game = new Prakoto();
    game.preload();
    game.animate();
};

class Prakoto {
    constructor() {
        this.renderer = PIXI.autoDetectRenderer(800, 600, {antialias: true});
        // create an empty container
        this.gameContainer = new PIXI.Container();
        //var colorMatrix = [
        //    1, 0, 0, 0,
        //    0, 1, 0, 0,
        //    0, 0, 1, 0,
        //    0, 0, 0, 1
        //];
        //var filter = new PIXI.filters.ColorMatrixFilter();
        ////        filter.technicolor(50);
        ////filter.matrix = colorMatrix;
        //this.gameContainer.filters = [filter];
        // add the renderer view element to the DOM
        document.getElementById('game-container').appendChild(this.renderer.view);
        this.level = 0;
        this.presentLevel();
        this.setUpEvents();
    }

    setupLevel() {
        this.state = 'inLevel';
        this.gameContainer.removeChildren();
        var level = levels[this.level];
        this.mold = new Polygon([225, 300], level.goal, {
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
        this.sound.play('change');
        this.initTime = new Date();
        if (this.tool) {
            this.tool.graphics.clear();
            this.gameContainer.removeChild(this.tool);
        }
        this.tool = new Polygon([600, 300], phase.tool, {
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
            var type =levels[this.level].phases[this.phase].type;
            this.shape.modify(this.tool, type);
            this.sound.play(type);
        });
    }

    preload() {
        var sprites = {};
        var loader = PIXI.loader
        .add('add','/sound/add.mp3')
            .load((loader, resources) => {
                this.onLoad();
                this.sound = new Sound();
            });

    }

    setupEndGame() {
        this.gameContainer.removeChildren();
        this.state = 'endGame';
        this.endGame = new EndGame();
        this.gameContainer.addChild(this.endGame.getContainer());
    }

    presentLevel() {
        this.gameContainer.removeChildren();
        this.initTime = new Date();
        this.state = 'levelPresentation';
        this.presentation = new LevelPresentation(levels[this.level]);
        this.gameContainer.addChild(this.presentation.getContainer());
    }

    renderLevelPresentation() {
        if (this.time > 3) {
            this.gameContainer.removeChild(this.presentation.getContainer());
            this.setupLevel();
        }
    }

    animate() {
        var now = new Date();
        this.time = (now.getTime() - this.initTime.getTime() )/1000;
        switch (this.state) {
            case 'levelPresentation':
                this.renderLevelPresentation();
            break;
            case 'inLevel':
                this.renderMouse();
                this.renderTimer();
                this.checkEnd();
            break;
            case 'endGame':
            break;
        }
        this.renderer.render(this.gameContainer);
        requestAnimationFrame(this.animate.bind(this));
        return this;
    }

    renderTimer() {

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
            var phaseSector = initSector(phase.color, [700, 100]).arc(0, 0, 70, offsetAngle + initAngle, offsetAngle + angle);
            this.gameContainer.addChild(phaseSector);
            this.sectors.push(phaseSector);
        }
        var finalAngle = ((this.time + pastTime)/levelTime) * 2 * Math.PI;

        var currentSector = initSector(level.phases[this.phase].color, [700, 100]).arc(0, 0, 70, offsetAngle + angle, offsetAngle + finalAngle);
        this.gameContainer.addChild(currentSector);
        this.sectors.push(currentSector);
    }

    checkEnd() {
        var level = levels[this.level];
        var phase = level.phases[this.phase];
        if (this.time >= phase.time) {
            if (this.phase == level.phases.length - 1) {
                if (this.shape.compare(this.mold)) {
                    this.level ++;
                    this.sound.play('success');
                } else {
                    this.sound.play('fail');
                }
                if (this.level == levels.length) {
                    this.setupEndGame();

                } else {
                    this.presentLevel();
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
