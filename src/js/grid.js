import Bomb from "./bomb.js";
import Cell from "./cell.js";
import EventBus from "./eventBus.js";

import { getRandomArbitrary, getIndexByClick } from "./utils.js"

export default class Grid {
    constructor(size, playingField, context, bombCount, enabledAnimation) {
        this._eventBus = new EventBus();
        this._cellArray = [];
        this._bombArray = [];

        this.height = size;
        this.width = size;
        this.context = context;
        this.bombCount = bombCount; 
        this.cellSize = 650 / size;
        this.enabledAnimation = enabledAnimation;

        this._createCells();
        this._placeBombs();

        this._addEventListeners(playingField);
        this._eventBus.addEventListener("restart", ()=>this.restart());
    }
    restart() {
        this._cellArray = [];
        this._bombArray = [];

        this._createCells();
        this._placeBombs();
    }
    _addEventListeners(playingField) {
        playingField.addEventListener('click', (event) => {
            let { x, y } = getIndexByClick(event, this.cellSize);

            if (x < this.width && y < this.height) {
                this._cellArray[x][y].checkCell(this._cellArray);
            }
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
            if (prevState.x !== -1 && prevState.y !== -1) {
                this._cellArray[prevState.x][prevState.y].outCell();
            }
            prevState = { x: -1, y: -1 };
        });

        if (this.enabledAnimation) {
            playingField.addEventListener('click', (event) => {
                let vX = (-325 + event.offsetX) > 0 ? 1 : -1;
                let vY = (325 - event.offsetY) > 0 ? 1 : -1;

                let lengthX = Math.abs(325 - event.offsetX);
                let lengthY = Math.abs(325 - event.offsetY);

                let propX = (lengthX * 15) / 325;
                let propY = (lengthY * 15) / 325;

                let rotX = propX * vY;
                let rotY = propY * vX;

                playingField.style.transform = `perspective(1300px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

                setTimeout(() => {
                    playingField.style.transform = "perspective(1300px) rotateX(0deg) rotateY(0deg)";
                }, 350)
            });
        }
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
    _placeBombs() {
        let bombCount = this.bombCount;

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
