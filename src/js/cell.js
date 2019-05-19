import { getDirections } from "./utils.js"

export default class Cell {
    constructor(x, y, context, color, cellSize) {
        this._number = 0;

        this.isMakred = false;
        this.size = cellSize;
        this.isOpen = false;
        this.bomb = null;
        this.x = x;
        this.y = y;
        this.context = context;
        this.globalX = this.x * this.size;
        this.globalY = this.y * this.size;
        this.color = color;


        this._renderCell(this.color);
    }
    _renderCell(color) {
        this.context.fillStyle = color;
        this.context.fillRect(this.globalX, this.globalY, this.size, this.size);
    }
    _renderText(color, text) {
        let offset = this.size / 2;
        let fontSize = (28 * this.size) / 65;

        this.context.font = `${fontSize}px Arial `;
        this.context.fillStyle = color;
        this.context.fillText(text, this.globalX + (offset / 1.5), this.globalY + (offset * 1.25));
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
        // this.renderNumber();
    }
    checkCell(cellArray) {
        if (this.isOpen === false) {
            this.openCell();

            if (this.bomb !== null) {
                this.bomb.render();
            } else if (this.number === 0) {
                this.lookAround(cellArray);
            } else {
                this.displayNumber();
            }
        }
    }
    markCell() {
        this.isMakred = !this.isMakred;

        if (this.isOpen === false) {
            if (this.isMakred) {
                this._renderText("orange","✖")
            } else {
                this._renderCell(this.color);
            }
        }
    }
    displayNumber() {
        if (this.number) {
            this._renderText("black", this.number);
        }
    }
    overCell() {
        if (this.isOpen === false) {
            this._renderCell("#57cb57");
            
            if (this.isMakred) {
                this._renderText("orange","✖");
            }
        }
    }
    outCell() {
        if (this.isOpen === false) {
            this._renderCell(this.color);

            if (this.isMakred) {
                this._renderText("orange","✖");
            }
        }
    }
    openCell() {
        this.isOpen = true;

        this.context.fillStyle = "PapayaWhip";
        this.context.fillRect(this.globalX, this.globalY, this.size, this.size);

        this.context.strokeStyle = "Burlywood";
        this.context.lineWidth = 3;
        this.context.strokeRect(this.globalX + 1.5, this.globalY + 1.5, this.size - 3, this.size - 3);
    }
    lookAround(cellArray) {

        let directions = getDirections(this.x, this.y);

        for (let item of directions) {
            let [x, y] = item;

            try {
                if (cellArray[x][y].number === 0) {
                    cellArray[x][y].number = undefined;
                    cellArray[x][y].openCell();
                    cellArray[x][y].lookAround(cellArray);
                } else {
                    cellArray[x][y].openCell();
                    cellArray[x][y].displayNumber();
                }
            } catch {
                continue;
            }
        }
    }
}
