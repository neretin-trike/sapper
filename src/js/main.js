window.onload = function () {
    const dom = {
        playingField: document.getElementById("playing-field"),
    }

    dom.playingField.width = 500;
    dom.playingField.height = 500;

    const ctx = dom.playingField.getContext("2d");

    class Cell {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Grid {
        constructor(width, height) {
            this.cellArray = [];
            
            let o = 0;
            for (let i = 0; i < width; i++) {
                this.cellArray[i] = [];
                for (let j = 0; j < height; j++) {

                    let offsetX = 50;
                    let offsetY = 50;

                    if (o % 2 == 0) {
                        ctx.fillStyle = "green";
                    } else {
                        ctx.fillStyle = "darkgreen";
                    }

                    this.cellArray[i][j] = new Cell(i,j);
                    ctx.fillRect(i*offsetX, j*offsetY, 50, 50);

                    o++;
                }
                o++;
            }
        }
    }



    let grid = new Grid(10,10);
    console.log(grid);
}