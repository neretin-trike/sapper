import EventBus from "./eventBus.js";

export default class GameOverWindow {
    constructor(size, bombCount, dom) {
        this._eventBus = new EventBus();
        this.size = size;
        this.bombCount = bombCount;
        this.gameInfo = this._getInitialValues();
        this.gameOverWindow = dom;

        this._addEventListeners();
    }
    _getInitialValues() {
        return {
            time: 0,
            bombLeft: this.bombCount,
            markUsed: 0,
            countOpen: 0
        }
    }
    _addEventListeners() {
        let button = this.gameOverWindow.querySelector(".button");
        button.addEventListener("click", () => {
            this.gameInfo = this._getInitialValues();
            this.gameOverWindow.classList.add("hidden");
            this._eventBus.emitEvent("restart");
        });

        this._eventBus.addEventListener("markSet", (bomb) => {
            this.gameInfo.markUsed += 1;

            if (bomb !== null) {
                this.gameInfo.bombLeft -= 1;
            }
            // if (this.gameInfo.bombLeft === 0) {
            //     this._showGameOverWindow(true);
            // }
        })
        this._eventBus.addEventListener("markUnset", (bomb) => {
            this.gameInfo.markUsed -= 1;

            if (bomb !== null) {
                this.gameInfo.bombLeft += 1;
            }
        })
        this._eventBus.addEventListener("openCell", (bomb) => {

            this.gameInfo.countOpen += 1;

            let maxCellOpen = this.size * this.size - this.bombCount;

            if (this.gameInfo.countOpen === maxCellOpen) {
                this._showGameOverWindow(true);
            }

            if (bomb !== null) {
                this._showGameOverWindow(false);
            }
        })
    }
    _showGameOverWindow(win) {
        let header = this.gameOverWindow.querySelector(".game-status");
        let table = this.gameOverWindow.querySelector(".game-result");
        table.rows[0].cells[1].textContent = this.gameInfo.time;
        table.rows[1].cells[1].textContent = this.gameInfo.markUsed;
        table.rows[2].cells[1].textContent = this.gameInfo.bombLeft;

        this.gameOverWindow.classList.remove("hidden");
        if (win) {
            this.gameOverWindow.classList.add("win");
            this.gameOverWindow.classList.remove("lose");
            header.textContent = "Вы победили!";
        } else {
            this.gameOverWindow.classList.add("lose");
            this.gameOverWindow.classList.remove("win");
            header.textContent = "Вы проиграли";
        }
    }
}