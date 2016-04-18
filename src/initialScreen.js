var PIXI = require('pixi.js')
import Polygon from './polygon';
import colors from './colors';

class InitialScreen {
    constructor(level) {
        this.level = level;
        this.container = new PIXI.Container();
        this.render();
    }

    render() {
        var text = new PIXI.Text('Sculp Master', {font : '96px Josefin Sans', fill : 0xFFFFFF, align : 'center'});
        //console.log(text);
        text.position.x = 400 - text.width / 2;
        text.position.y = 100;
        this.container.addChild(text);
    }

    getContainer() {
        return this.container;
    }
}

export default InitialScreen;
