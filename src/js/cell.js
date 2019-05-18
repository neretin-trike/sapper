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


        this._renderCell();
    }
    _renderCell = () => {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.globalX, this.globalY, this.size, this.size);
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
                // alert("произошол проигрыш");
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
                let offset = this.size / 2;
                let fontSize = (28 * this.size) / 65;

                this.context.font = `${fontSize}px Arial `;
                this.context.fillStyle = "Orange";
                this.context.fillText("✖", this.globalX + (offset / 1.5), this.globalY + (offset * 1.25));
            } else {
                this._renderCell();
            }
        }
    }
    displayNumber() {
        if (this.number) {
            let offset = this.size / 2;
            let fontSize = (28 * this.size) / 65;

            this.context.font = `${fontSize}px Arial `;
            this.context.fillStyle = "black";
            this.context.fillText(this.number, this.globalX + (offset / 1.5), this.globalY + (offset * 1.25));
        }
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
    openCell() {
        this.isOpen = true;

        this.context.fillStyle = "PapayaWhip";
        this.context.fillRect(this.globalX, this.globalY, this.size, this.size);

        this.context.strokeStyle = "Burlywood";
        this.context.lineWidth = 3;
        this.context.strokeRect(this.globalX + 1.5, this.globalY + 1.5, this.size - 3, this.size - 3);
    }
    hoverCell() {
        // this.context.fillStyle = "LimeGreen";
        // this.context.fillRect(this.globalX, this.globalY, this.size, this.size);
        // console.log("asd");
    }
}
