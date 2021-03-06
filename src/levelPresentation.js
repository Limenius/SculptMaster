var PIXI = require('pixi.js')
import {initSector} from './sector';
import Polygon from './polygon';
import colors from './colors';

class LevelPresentation {
    constructor(level) {
        this.level = level;
        this.container = new PIXI.Container();
        this.render();
    }

    render() {
        var text = new PIXI.Text(this.level.title,{font : '48px Josefin Sans', fill : 0xFFFFFF, align : 'center'});
        //console.log(text);
        text.position.x = 400 - text.width / 2;
        text.position.y = 20;
        this.container.addChild(text);
        this.renderTimer();
        this.renderTools();
    }

    renderTools() {
        var pastTime = 0;
        var levelTime = this.getLevelTime();

        var offsetAngle = - Math.PI /2;

        for (var i = 0; i < this.level.phases.length; i++) {
            var phase = this.level.phases[i];
            var timePortion = (pastTime + phase.time / 2) / levelTime;
            var radius = 100;
            var x = Math.cos(timePortion * 2 * Math.PI + offsetAngle) * radius + 400;
            var y = Math.sin(timePortion * 2 * Math.PI + offsetAngle) * radius + 300;

            pastTime += phase.time;

            if (this.level.phases.length == 1) {
                var x = 400;
                var y = 300;
            }

            var [centerX, centerY] = phase.center;
            var center = phase.signCenter ? phase.signCenter : phase.center;
            var tool = new Polygon([x, y], phase.tool, {
                fillColor : colors.background,
                fillAlpha : 0.5,
                center: center,
            });

            var insideText;
            switch(phase.type) {
                case 'subtract':
                    insideText = '-';
                    break;
                case 'add':
                    insideText = '+';
                    break;
            }

            var text = new PIXI.Text(insideText,{font : '48px Josefin Sans', fill : 0x101010, align : 'center'});
            text.position.x = x - text.width / 2;
            text.position.y = y - text.height / 2;


            this.container.addChild(tool.getGraphics());
            this.container.addChild(text);
        }
    }

    getLevelTime() {
        return _.reduce(this.level.phases, function(sum, phase) {
            return sum + phase.time;
        }, 0);
    }

    renderTimer() {
        var angle = 0;
        var pastTime = 0;
        var offsetAngle = - Math.PI /2;

        var levelTime = this.getLevelTime();

        for (var i = 0; i < this.level.phases.length; i++) {
            var phase = this.level.phases[i];
            var initAngle = angle;
            angle = ((pastTime + phase.time)/levelTime) * 2 * Math.PI;
            pastTime += phase.time;
            var phaseSector = initSector(phase.color, [400, 300]).arc(0, 0, 200, offsetAngle + initAngle, offsetAngle + angle);
            this.container.addChild(phaseSector);
        }
    }

    getContainer() {
        return this.container;
    }
}

export default LevelPresentation;
