import Bomb from "./bomb.js";
import Cell from "./cell.js";

import { getRandomArbitrary } from "./utils.js"

export default class Grid {
    constructor(width, height, playingField, context) {
        this._cellArray = [];
        this._bombArray = [];

        this.height = height;
        this.width = width;

        let cellSize = 650 / width;

        const createCells = () => {
            let even = 0;
            for (let i = 0; i < width; i++) {

                this._cellArray[i] = [];

                for (let j = 0; j < height; j++) {

                    if (even % 2 == 0) {
                        this._cellArray[i][j] = new Cell(i, j, context, "green", cellSize);
                    } else {
                        this._cellArray[i][j] = new Cell(i, j, context, "darkgreen", cellSize);
                    }

                    even += 1;
                }
                even += 1;
            }
        }
        createCells();

        playingField.addEventListener('click', (event) => {
            let restX = Math.trunc(event.offsetX / cellSize);
            let restY = Math.trunc(event.offsetY / cellSize);

            this._cellArray[restX][restY].checkCell(this._cellArray);
            
        });
        playingField.addEventListener('contextmenu', (event) => {
            let restX = Math.trunc(event.offsetX / cellSize);
            let restY = Math.trunc(event.offsetY / cellSize);
            event.preventDefault();
            this._cellArray[restX][restY].markCell();
        });
        playingField.addEventListener('mousemove', (event) => {

        });
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

                cell.bomb.render.call(this._cellArray[randomX][randomY]);
            }
        }

        this._bombArray.forEach(bomb => {
            bomb.lookAround(this._cellArray);
        });
    }
}
