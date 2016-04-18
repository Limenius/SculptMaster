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
        var text = new PIXI.Text('Sculpt Master', {font : '96px Josefin Sans', fill : 0xFFFFFF, align : 'center'});
        //console.log(text);
        text.position.x = 400 - text.width / 2;
        text.position.y = 150;
        this.container.addChild(text);

        var goal1 = [[50, -50], [0, 0], [0, 25], [25, 25], [25, 75], [75, 75], [75, 25], [100, 25], [100, 0]];

        var mold1 = new Polygon([250, 400], goal1, {
            fillColor : colors.tertiary,
            fillAlpha : 1,
            center: [0, 0],
        });

        var initial1 = new Polygon([450, 400], goal1, {
            fillColor : colors.primary,
            fillAlpha : 1,
            center: [0, 0],
        });

        this.container.addChild(mold1.getGraphics());
        this.container.addChild(initial1.getGraphics());
    }

    getContainer() {
        return this.container;
    }
}

export default InitialScreen;
