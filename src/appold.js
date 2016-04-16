//require('./styles/style.scss');
var PIXI = require('pixi.js')

console.log(PIXI)

window.onload = function ()
{
    var game = new PairsGame()
    .init()
    .preload()
    .animate();
};

var PairsGame = function () {};
PairsGame.prototype.init = function ()
{ // create a renderer instance width=640 height=480
    this.renderer = PIXI.autoDetectRenderer(640,480);
    // create an empty container
    this.gameContainer = new PIXI.Container();
    // add the renderer view element to the DOM
    document.body.appendChild(this.renderer.view);
    // allow chain calling
    return this;
};

PairsGame.prototype.preload = function ()
{ // importing a texture atlas created with texturepacker
    var tileAtlas = ['images.json'];
    // create a new loader
    PIXI.loader.add(tileAtlas)
    // use callback
    .once('complete', this.onLoaded.bind(this))
    //begin load
    .load();
    //allow chain calling
    return this;
};

PairsGame.prototype.animate = function ()
{
    this.renderer.render(this.gameContainer);
    requestAnimationFrame(this.animate.bind(this));
    //allow chain calling
    return this;
};

PairsGame.prototype.resetSelection = function ()
{ // first tile picked up by the player
    this.firstTile   = null;
    // second tile picked up by the player
    this.secondTile  = null;
    // can the player pick up a tile?
    this.canPick     = true;

    return this;
};

PairsGame.prototype.onLoaded = function ()
{ // grey background
    this.renderer.backgroundColor = 0x888888;
    this.resetSelection();
    // choose 24 random tile images
    var chosenTiles = new Array();
    while(chosenTiles.length < 48)
        {
            var candidate = Math.floor( Math.random() * 44);
            if(chosenTiles.indexOf(candidate) == -1)
                {
                    chosenTiles.push(candidate, candidate);
                }
        }
        var i;
        // shuffle the chosen tiles
        for(i = 0; i < 96; i++)
        {
            var from  = Math.floor(Math.random() * 48),
                to     = Math.floor(Math.random() * 48),
                    tmp   = chosenTiles[from];
                    chosenTiles[from] = chosenTiles[to];
                    chosenTiles[to]   = tmp;
        }
        // place onTouch tiles
        for(i = 0; i < 8; i++)
        {
            for(var j = 0; j < 6; j++)
            {
                var tile   = new CustomTile(chosenTiles[i*6+j], i, j, this);
                this.gameContainer.addChild(tile);
            }
        }
};
var CustomTile = function (frame, i, j, game)
{
    var texture = PIXI.Texture.fromFrame(frame);
    PIXI.Sprite.call(this, texture);

    // buttonmode+interactive = acts like a button
    this.buttonMode  = true;
    this.interactive = true;
    // is the tile selected?
    this.isSelected  = false;
    // set a tile value
    this.theVal      = frame;
    // place the tile
    this.position.x  = 7 + i * 80;
    this.position.y  = 7 + j * 80;
    // hide the tile
    this.tileHiding();
    // mouse-touch listener
    this.mousedown   = this.touchstart = this.onTouch;
    // reference of the actual object
    this.game  = game;
};
CustomTile.constructor = CustomTile;
CustomTile.prototype = Object.create(PIXI.Sprite.prototype);
CustomTile.prototype.tileHiding = function()
{ // paint tile black
    //tile.tint = 0x000000;
    // set it a bit transparent (it will look grey)
    this.alpha      = 0.5;
    this.isShowing  = false;
};
CustomTile.prototype.tileShowing = function()
{
    this.tint       = 0xffffff;
    this.alpha      = 1;
    this.isShowing  = true;
};
CustomTile.prototype.onTouch = function()
{
    // can I pick a tile?
    if(this.game.canPick)
        { // is the tile already selected?
            if(!this.isShowing)
                { // show the tile
                    this.tileShowing();
                    // is it the first tile we uncover?
                    if(this.game.firstTile == null)
                        {
                            this.game.firstTile = this;
                            // this is the second tile
                        } else {
                            this.game.secondTile = this;
                            // can't pick anymore
                            this.game.canPick = false;
                            var that      = this,
                                response  = function () {};
                                // did we pick the same tiles?
                                if(this.game.firstTile.theVal == this.game.secondTile.theVal) {
                                    response = function ()
                                    { // will remove the tiles
                                        that.game.gameContainer.removeChild(that.game.firstTile);
                                        that.game.gameContainer.removeChild(that.game.secondTile);
                                    }
                                    // we picked different tiles
                                } else {
                                    response = function ()
                                    { // will cover the tiles
                                        that.game.firstTile.tileHiding();
                                        that.game.secondTile.tileHiding();
                                    }
                                }
                                // wait a second then  and make the player able to pick again
                                setTimeout( function () {
                                    response();
                                    that.game.resetSelection();
                                }, 1000);
                        }
                }
        }
};
