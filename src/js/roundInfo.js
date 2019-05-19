import EventBus from "./eventBus.js";

export default class RoundInfo {
    constructor(size, bombCount, dom, displayTime) {
        this._eventBus = new EventBus();
        this.size = size;
        this.bombCount = bombCount;

        this.roundInfo = dom;

        this._valuesRender();
        this._addEventListeners(displayTime);
    }
    _valuesRender() {
        let sizeValueDOM = this.roundInfo.querySelector(".size .value");
        let bombCountValueDOM = this.roundInfo.querySelector(".bomb-count .value");

        sizeValueDOM.textContent = `${this.size} на ${this.size}`;
        bombCountValueDOM.textContent = `${this.bombCount}`;
    }
    _addEventListeners(displayTime) {
        let timeDOM = this.roundInfo.querySelector(".time");
        let timeValueDOM = this.roundInfo.querySelector(".time .value");

        if (displayTime === false) {
            timeDOM.classList.add("hidden");
        }
        this._eventBus.addEventListener("updateTime", (time) => {
            timeValueDOM.textContent = `${time}`;
        })
    }
}