export const initSector = (color, [x, y]) => {
    var sector = new PIXI.Graphics();
    sector.clear();
    sector.beginFill(color);
    sector.position.x = x;
    sector.position.y = y;
    sector.moveTo(0, 0);
    return sector;
}
