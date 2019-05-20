import EventBus from "./eventBus.js";

export default class GameOverWindow {
    constructor(size, bombCount, dom) {
        this._eventBus = new EventBus();
        this.size = size;
        this.bombCount = bombCount;
        this.gameInfo = this._getInitialValues();
        this.gameOverWindow = dom;

        this.stopwatch = this._startStopwatch();

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
    _startStopwatch() {
        return setInterval( () => {
            this.gameInfo.time += 1;
            this._eventBus.emitEvent("updateTime", this.gameInfo.time);
        }, 1000)
    }
    _addEventListeners() {
        let button = this.gameOverWindow.querySelector(".button");
        button.addEventListener("click", () => {
            this.gameOverWindow.classList.add("hidden");

            this._eventBus.emitEvent("restartGame");
        });

        this._eventBus.addEventListener("restartGame", ()=>{
            this.gameInfo = this._getInitialValues();
            clearTimeout(this.stopwatch);
            this.stopwatch = this._startStopwatch();

            this._eventBus.emitEvent("restart");
        });

        this._eventBus.addEventListener("markSet", (bomb) => {
            this.gameInfo.markUsed += 1;

            if (bomb !== null) {
                this.gameInfo.bombLeft -= 1;
            }
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
        this._eventBus.addEventListener("stopwatchPause",()=>{
            clearTimeout(this.stopwatch);
        });
        this._eventBus.addEventListener("continuewatchPause",()=>{
            this.stopwatch = this._startStopwatch();
        });
    }
    _showGameOverWindow(win) {
        let headerDOM = this.gameOverWindow.querySelector(".game-status");
        let tableDOM = this.gameOverWindow.querySelector(".game-result");

        clearTimeout(this.stopwatch);

        tableDOM.rows[0].cells[1].textContent = this.gameInfo.time;
        tableDOM.rows[1].cells[1].textContent = this.gameInfo.markUsed;
        tableDOM.rows[2].cells[1].textContent = this.gameInfo.bombLeft;

        this.gameOverWindow.classList.remove("hidden");
        if (win) {
            this.gameOverWindow.classList.add("win");
            this.gameOverWindow.classList.remove("lose");
            headerDOM.textContent = "Вы победили!";
        } else {
            this.gameOverWindow.classList.add("lose");
            this.gameOverWindow.classList.remove("win");
            headerDOM.textContent = "Вы проиграли";
        }
    }
}