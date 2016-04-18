var PIXI = require('pixi.js')
import {initSector} from './sector';
import Polygon from './polygon';
import colors from './colors';

class EndGame {
    constructor(won) {
        this.container = new PIXI.Container();
        this.won = won;
        this.render();
    }

    render() {
        var text = new PIXI.Text(this.won ? 'Well done there!' : 'Game Over',{font : '48px Josefin Sans', fill : 0xFFFFFF, align : 'center'});
        text.position.x = 275;
        text.position.y = 275;
        this.container.addChild(text);
    }

    getContainer() {
        return this.container;
    }
}

export default EndGame;
