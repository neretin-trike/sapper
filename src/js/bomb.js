import { getDirections } from "./utils.js"

export default class Bomb {
    constructor(cell) {
        let { context, globalX, globalY, x, y, size } = cell;

        this.context = context;
        this.x = x;
        this.y = y;
        this.size = size;
        this.globalX = globalX;
        this.globalY = globalY;
    }
    render() {
        let offset = this.size/2;
        let radius = (10 * this.size) / 65;

        this.context.beginPath();
        this.context.fillStyle = "Crimson";
        this.context.arc(this.globalX + offset, this.globalY + offset, radius, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.fill();
    }
    lookAround(cellArray) {

        let directions = getDirections(this.x, this.y);

        for (let item of directions) {
            let [x, y] = item;

            try {
                if (cellArray[x][y].bomb === null) {
                    cellArray[x][y].number += 1;
                }
            } catch {
                continue;
            }
        }
    }
}
