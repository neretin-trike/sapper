window.onload = function () {
    const dom = {
        playingField: document.getElementById("playing-field"),
    }

    dom.playingField.width = 650;
    dom.playingField.height = 650;

    // dom.playingField.addEventListener('click', (event) => {
    //     let vX = (-325 + event.offsetX) > 0 ? 1 : -1;
    //     let vY = (325 - event.offsetY) > 0 ? 1 : -1;

    //     let lengthX = Math.abs(325 - event.offsetX);
    //     let lengthY = Math.abs(325 - event.offsetY);

    //     let propX = (lengthX * 15) / 325;
    //     let propY = (lengthY * 15) / 325;

    //     let rotX = propX * vY;
    //     let rotY = propY * vX;

    //     console.log(rotX, rotY);

    //     dom.playingField.style.transform = `perspective(1300px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    //     setTimeout(() => {
    //         dom.playingField.style.transform = "perspective(1300px) rotateX(0deg) rotateY(0deg)";
    //     }, 300)
    // });

    const getRandomArbitrary = (min, max) => {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    const getDirections = (target) => {
        return [
            [target.x - 1, target.y - 1],
            [target.x, target.y - 1],
            [target.x + 1, target.y - 1],
            [target.x + 1, target.y],
            [target.x + 1, target.y + 1],
            [target.x, target.y + 1],
            [target.x - 1, target.y + 1],
            [target.x - 1, target.y],
        ]
    }

    const ctx = dom.playingField.getContext("2d");

    class Cell {
        constructor(x, y, context, even, cellSize) {

            this.bomb = null;
            this.number = 0;

            this._size = cellSize;

            this.x = x;
            this.y = y;

            this.context = context;


            this.globalX = this.x * this._size;
            this.globalY = this.y * this._size;

            if (even % 2 == 0) {
                this.color = "green";
            } else {
                this.color = "darkgreen";
            }

            this.context.fillStyle = this.color;
            this.context.fillRect(this.globalX, this.globalY, this._size, this._size);
        }
        checkCell(cellArray) {

            this.openCell();

            if (this.bomb !== null) {
                this.bomb.render.call(this);
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
            this.context.font = "400 28px Arial";
            this.context.fillStyle = "black";
            this.context.fillText(this.number, this.globalX + 15, this.globalY + 35);
        }
        setNumber() {
            this.number += 1;
            this.renderNumber();
        }
        check(cellArray) {
            let directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y],
                [this.x + 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x - 1, this.y + 1],
                [this.x - 1, this.y],
            ]

            console.log(directions);

            for (let item of directions) {
                let [x, y] = item;

                try {
                    if (cellArray[x][y].number === 0) {
                        cellArray[x][y].number = "";
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

    class Bomb {
        constructor(context, cell) {
            this.context = context;
            this.cell = cell;
        }
        render() {
            this.context.beginPath();
            this.context.fillStyle = "Crimson";
            this.context.arc(this.globalX + 25, this.globalY + 25, 10, 0, Math.PI * 2, false);
            this.context.closePath();
            this.context.fill();
        }
        lookAround(cellArray) {

            let directions = getDirections(this.cell);

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

    class Grid {
        constructor(width, height, playingField) {

            let cellSize = 650 / width;

            this.cellArray = [];
            this.bombArray = [];

            let even = 0;
            for (let i = 0; i < width; i++) {
                this.cellArray[i] = [];
                for (let j = 0; j < height; j++) {

                    this.cellArray[i][j] = new Cell(i, j, ctx, even, cellSize);

                    even += 1;
                }
                even += 1;
            }

            playingField.addEventListener('click', (event) => {
                let restX = Math.trunc(event.offsetX / cellSize);
                let restY = Math.trunc(event.offsetY / cellSize);;
                this.cellArray[restX][restY].checkCell(this.cellArray);
            });
            playingField.addEventListener('mousemove', (event) => {
                // let restX = Math.trunc(event.offsetX / cellSize);
                // let restY = Math.trunc(event.offsetY / cellSize);

                // this.cellArray[restX][restY].hoverCell();
            });
        }
        placeBombs(count) {
            let bombCount = count;
            while (bombCount) {

                let randomX = getRandomArbitrary(0, bombCount - 1);
                let randomY = getRandomArbitrary(0, bombCount - 1);

                let cell = this.cellArray[randomX][randomY];

                if (cell.bomb === null) {

                    cell.bomb = new Bomb(ctx, cell);
                    cell.bomb.render.call(this.cellArray[randomX][randomY]);
                    // this.cellArray[randomX][randomY].bomb.renderBomb.call(this.cellArray[randomX][randomY]);
                    this.bombArray.push(cell.bomb);

                    bombCount -= 1;
                }
            }

            this.bombArray.forEach(bomb => {
                bomb.lookAround(this.cellArray);
            });
        }
    }

    let grid = new Grid(10, 10, dom.playingField);
    grid.placeBombs(10);
    console.log(grid);


}