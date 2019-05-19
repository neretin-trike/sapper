import Bomb from "./bomb.js";
import Cell from "./cell.js";

import { getRandomArbitrary, getIndexByClick } from "./utils.js"

export default class Grid {
    constructor(width, height, playingField, context) {
        this._cellArray = [];
        this._bombArray = [];

        this.context = context;
        this.height = height;
        this.width = width;
        this.cellSize = 650 / this.width;

        this._createCells();
        this._addEventListeners(playingField);

    }
    _addEventListeners(playingField) {
        playingField.addEventListener('click', (event) => {
            let { x, y } = getIndexByClick(event, this.cellSize);

            this._cellArray[x][y].checkCell(this._cellArray);
        });

        playingField.addEventListener('contextmenu', (event) => {
            let { x, y } = getIndexByClick(event, this.cellSize);

            event.preventDefault();
            this._cellArray[x][y].markCell();
        });

        let prevState = { x: -1, y: -1 };
        playingField.addEventListener('mousemove', (event) => {

            let { x, y } = getIndexByClick(event, this.cellSize);

            if ((x < this.width && y < this.height) &&
                (prevState.x !== x || prevState.y !== y)) {

                if (prevState.x !== -1 && prevState.y !== -1) {
                    this._cellArray[prevState.x][prevState.y].outCell();
                }
                
                prevState = { x, y };
                this._cellArray[x][y].overCell();
            }

        });

        playingField.addEventListener('mouseout', (event) => {
            this._cellArray[prevState.x][prevState.y].outCell();
            prevState = { x: -1, y: -1 };
        });
    }
    _createCells() {

        let even = 0;
        for (let i = 0; i < this.width; i++) {

            this._cellArray[i] = [];

            for (let j = 0; j < this.height; j++) {

                if (even % 2 == 0) {
                    this._cellArray[i][j] = new Cell(i, j, this.context, "green", this.cellSize);
                } else {
                    this._cellArray[i][j] = new Cell(i, j, this.context, "darkgreen", this.cellSize);
                }

                even += 1;
            }
            even += 1;
        }
    }
    placeBombs(count) {
        let bombCount = count;

        while (bombCount) {

            let randomX = getRandomArbitrary(0, this.width - 1);
            let randomY = getRandomArbitrary(0, this.height - 1);

            let cell = this._cellArray[randomX][randomY];

            if (cell.bomb === null) {

                cell.bomb = new Bomb(cell);
                this._bombArray.push(cell.bomb);
                bombCount -= 1;
                // cell.bomb.render.call(this._cellArray[randomX][randomY]);
            }
        }

        this._bombArray.forEach(bomb => {
            bomb.lookAround(this._cellArray);
        });
    }
}
