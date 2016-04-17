var PIXI = require('pixi.js')
import {initSector} from './sector';
import Polygon from './polygon';
import colors from './colors';

class EndGame {
    constructor() {
        this.container = new PIXI.Container();
        this.render();
    }

    render() {
        var text = new PIXI.Text('Game Over',{font : '48px Josefin Sans', fill : 0xFFFFFF, align : 'center'});
        text.position.x = 300;
        text.position.y = 300;
        this.container.addChild(text);
    }

    getContainer() {
        return this.container;
    }
}

export default EndGame;
