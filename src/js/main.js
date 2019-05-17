window.onload = function () {
    const dom = {
        playingField: document.getElementById("playing-field"),
    }

    dom.playingField.width = 500;
    dom.playingField.height = 500;



    const ctx = dom.playingField.getContext("2d");

    class Cell {
        constructor(x, y, context, even) {
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
        cellOpen() {
            this.context.fillStyle = "PapayaWhip";
            this.context.fillRect(this.globalX, this.globalY, 50, 50);

            this.context.strokeStyle = "Burlywood";
            this.context.lineWidth = 3;
            this.context.strokeRect(this.globalX+1.5, this.globalY+1.5, 50-3, 50-3);
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

            dom.playingField.addEventListener('click', (event) => {
                let ofX = event.offsetX;
                let ofY = event.offsetY;

                let restX = ofX % 50;
                let restY = ofY % 50;

                let answX = (ofX - restX) / 50;
                let answY = (ofY - restY) / 50;

                this.cellArray[answX][answY].cellOpen();
            });
        }
    }

    let grid = new Grid(10, 10);
    console.log(grid);
}