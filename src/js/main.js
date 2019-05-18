window.onload = function () {
    const dom = {
        playingField: document.getElementById("playing-field"),
    }

    dom.playingField.width = 500;
    dom.playingField.height = 500;

    dom.playingField.addEventListener('click', (event) => {
        let vX = (-250 + event.offsetX) > 0 ? 1 : -1;
        let vY = (250 - event.offsetY) > 0 ? 1 : -1;

        let lengthX = Math.abs(250 - event.offsetX);
        let lengthY = Math.abs(250 - event.offsetY);

        let propX = (lengthX * 15) / 250;
        let propY = (lengthY * 15) / 250;

        let rotX = propX * vY;
        let rotY = propY * vX;

        console.log(rotX, rotY);

        dom.playingField.style.transform = `perspective(750px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

        setTimeout(() => {
            dom.playingField.style.transform = "perspective(750px) rotateX(0deg) rotateY(0deg)";
        }, 300)
    });

    const getRandomArbitrary = (min, max) => {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    const ctx = dom.playingField.getContext("2d");

    class Cell {
        constructor(x, y, context, even) {
            this.bomb = null;
            this.number = 0;

            this.x = x;
            this.y = y;

            this.context = context;

            let offsetX = 50;
            let offsetY = 50;

            this.globalX = this.x * offsetX;
            this.globalY = this.y * offsetY;

            if (even % 2 == 0) {
                this.context.fillStyle = "green";
            } else {
                this.context.fillStyle = "darkgreen";
            }

            this.context.fillRect(this.globalX, this.globalY, 50, 50);
        }
        cellOpen(cellArray) {
            this.context.fillStyle = "PapayaWhip";
            this.context.fillRect(this.globalX, this.globalY, 50, 50);

            this.context.strokeStyle = "Burlywood";
            this.context.lineWidth = 3;
            this.context.strokeRect(this.globalX + 1.5, this.globalY + 1.5, 50 - 3, 50 - 3);

            if (this.bomb !== null) {
                this.bomb.render.call(this);
            } else if (this.number === 0) {
                this.check(cellArray);
            } else {
                this.renderNumber();
            }
        }
        open() {
            this.context.fillStyle = "PapayaWhip";
            this.context.fillRect(this.globalX, this.globalY, 50, 50);

            this.context.strokeStyle = "Burlywood";
            this.context.lineWidth = 3;
            this.context.strokeRect(this.globalX + 1.5, this.globalY + 1.5, 50 - 3, 50 - 3);
        }
        renderNumber() {
            this.context.font = "400 28px Arial";
            this.context.fillStyle = "black";
            this.context.fillText(this.number, this.globalX + 15, this.globalY + 35);
        }
        setNumber() {
            this.number += 1;

            // this.renderNumber();
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

            for (let item of directions) {
                let [x, y] = item;

                try {
                    if (cellArray[x][y].number === 0) {
                        cellArray[x][y].number = "";
                        cellArray[x][y].open();
                        cellArray[x][y].check(cellArray);
                    } else {
                        cellArray[x][y].open();
                        cellArray[x][y].renderNumber();
                    }
                } catch {
                    continue;
                }
            }
        }
        cellLookAround(cellArray) {
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

    class Bomb {
        constructor(context) {
            this.context = context;
        }
        render() {
            this.context.beginPath();
            this.context.fillStyle = "Crimson";
            this.context.arc(this.globalX + 25, this.globalY + 25, 10, 0, Math.PI * 2, false);
            this.context.closePath();
            this.context.fill();
        }
    }

    class Grid {
        constructor(width, height) {
            this.cellArray = [];

            let even = 0;
            for (let i = 0; i < width; i++) {
                this.cellArray[i] = [];
                for (let j = 0; j < height; j++) {

                    this.cellArray[i][j] = new Cell(i, j, ctx, even);

                    even += 1;
                }
                even += 1;
            }

            let bombCount = 10;
            while (bombCount) {

                let randomX = getRandomArbitrary(0, 9);
                let randomY = getRandomArbitrary(0, 9);

                if (this.cellArray[randomX][randomY].bomb === null) {

                    this.cellArray[randomX][randomY].bomb = new Bomb(ctx);
                    // this.cellArray[randomX][randomY].bomb.render.call(this.cellArray[randomX][randomY]);

                    console.log(randomX, randomY);
                    bombCount -= 1;
                }
            }

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    if (this.cellArray[i][j].bomb) {
                        this.cellArray[i][j].cellLookAround(this.cellArray);
                    }
                }
            }


            dom.playingField.addEventListener('click', (event) => {
                let ofX = event.offsetX;
                let ofY = event.offsetY;

                let restX = ofX % 50;
                let restY = ofY % 50;

                let answX = (ofX - restX) / 50;
                let answY = (ofY - restY) / 50;

                this.cellArray[answX][answY].cellOpen(this.cellArray);
            });
        }
    }

    let grid = new Grid(10, 10);
    console.log(grid);


}