import { getDirections } from "./utils.js"

export default class Cell {
    constructor(x, y, context, even, cellSize) {
        this.bomb = null;
        this.number = 0;
        this.x = x;
        this.y = y;
        this.context = context;
        this._size = cellSize;
        this.globalX = this.x * this._size;
        this.globalY = this.y * this._size;

        const renderCell = () => {
            if (even % 2 == 0) {
                this.color = "green";
            } else {
                this.color = "darkgreen";
            }

            this.context.fillStyle = this.color;
            this.context.fillRect(this.globalX, this.globalY, this._size, this._size);
        }
        renderCell();
    }
    checkCell(cellArray) {
        this.openCell();

        if (this.bomb !== null) {
            this.bomb.render();
            alert("произошол проигрыш");
        } else if (this.number === 0) {
            this.check(cellArray);
        } else {
            this.renderNumber();
        }
    }
    openCell() {
        this.context.fillStyle = "PapayaWhip";
        this.context.fillRect(this.globalX, this.globalY, this._size, this._size);

        this.context.strokeStyle = "Burlywood";
        this.context.lineWidth = 3;
        this.context.strokeRect(this.globalX + 1.5, this.globalY + 1.5, this._size - 3, this._size - 3);
    }
    hoverCell() {
        // this.context.fillStyle = "LimeGreen";
        // this.context.fillRect(this.globalX, this.globalY, this._size, this._size);
        // console.log("asd");
    }
    renderNumber() {
        if (this.number) {
            this.context.font = "400 28px Arial";
            this.context.fillStyle = "black";
            this.context.fillText(this.number, this.globalX + 15, this.globalY + 35);
        }
    }
    setNumber() {
        this.number += 1;
        this.renderNumber();
    }
    check(cellArray) {

        let directions = getDirections(this.x, this.y);

        for (let item of directions) {
            let [x, y] = item;

            try {
                if (cellArray[x][y].number === 0) {
                    cellArray[x][y].number = undefined;
                    cellArray[x][y].openCell();
                    cellArray[x][y].check(cellArray);
                } else {
                    cellArray[x][y].openCell();
                    cellArray[x][y].renderNumber();
                }
            } catch {
                continue;
            }
        }
    }

}
