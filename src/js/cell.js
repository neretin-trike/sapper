import { getDirections } from "./utils.js"
import EventBus from "./gameState.js";

export default class Cell {
    constructor(x, y, context, color, cellSize) {
        this._number = 0;
        this._eventBus = new EventBus();
        // this._callbackList = {};

        this.isMakred = false;
        this.isOpen = false;
        this.size = cellSize;
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
    _renderHoverEffect(color) {
        if (this.isOpen === false) {
            this._renderCell(color);
            
            if (this.isMakred) {
                this._renderText("orange","✖");
            }
        }
    } 
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
        // this.renderNumber();
    }
    displayNumber() {
        if (this.number) {
            this._renderText("black", this.number);
        }
    }
    checkCell(cellArray) {
        if (this.isOpen === false) {
            this.openCell();

            if (this.bomb !== null) {
                this.bomb.render();
                this._eventBus.mediator.emitEvent("boom");

            } else if (this.number === 0) {
                this.lookAround(cellArray);
            } else {
                this.displayNumber();
            }
        }

        // this._callbackList["leftclick"]();
    }
    markCell() {
        if (this.isOpen === false) {
            this.isMakred = !this.isMakred;

            if (this.isMakred) {
                this._renderText("orange","✖");

                this._eventBus.mediator.emitEvent("markSet");
                if (this.bomb !== null) {
                    this._eventBus.mediator.emitEvent("bombFind");
                }

            } else {
                this.overCell();

                this._eventBus.mediator.emitEvent("markUnset");
                if (this.bomb !== null) {
                    this._eventBus.mediator.emitEvent("bombUnFind");
                }

            }
        }

        // this._callbackList["rightclick"](this.bomb);
    }
    overCell() {
        this._renderHoverEffect("#57cb57");
    }
    outCell() {
        this._renderHoverEffect(this.color);
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

                    setTimeout( () => {
                        cellArray[x][y].openCell();
                        cellArray[x][y].lookAround(cellArray);
                    }, 50 );

                } else {
                    cellArray[x][y].openCell();
                    cellArray[x][y].displayNumber();
                }
            } catch {
                continue;
            }
        }
    }
    // addEventListener(name, callback) {
    //     this._callbackList[name] = callback;
    // }
}
