import { getDirections } from "./utils.js"

export default class Bomb {
    constructor(cell) {
        let { context, globalX, globalY, x, y } = cell;

        this.context = context;
        this.x = x;
        this.y = y;
        this.globalX = globalX;
        this.globalY = globalY;
    }
    render() {
        this.context.beginPath();
        this.context.fillStyle = "Crimson";
        this.context.arc(this.globalX + 25, this.globalY + 25, 10, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.fill();
    }
    lookAround(cellArray) {

        let directions = getDirections(this.x, this.y);

        for (let item of directions) {
            let [x, y] = item;

            try {
                if (cellArray[x][y].bomb === null) {
                    cellArray[x][y].setNumber();
                }
            } catch {
                continue;
            }
        }
    }
}
