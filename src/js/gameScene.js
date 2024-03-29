import Grid from "./grid.js";
import GameOverWindow from "./gameOverWindow.js";
import SettingWindow from "./settingWindow.js";
import RoundInfo from "./roundInfo.js";

import EventBus from "./eventBus.js";

/*
    Реализация класса игровой сцены, инициирует 
    и создаёт основные элементы:
    - roundInfo - информация о раунде;
    - grid - сетка;
    - gameOverWindow - окно окончания игры
    - settingWindow - окно настроек игры
*/
export default class GameScene {
    constructor(domList, gameSetting) {
        this._eventBus = new EventBus();

        let { size,
            bombCount,
            displayTime,
            enabledAnimation } = gameSetting;

        let { gameOverWindow,
            settingWindow,
            settingButton,
            playingField,
            roundInfo } = domList;

        const context = playingField.getContext("2d");

        this.roundInfo = new RoundInfo(size, bombCount, roundInfo, displayTime);
        this.grid = new Grid(size, playingField, context, bombCount, enabledAnimation);

        this.gameOverWindow = new GameOverWindow(size, bombCount, gameOverWindow);
        this.settingWindow = new SettingWindow(gameSetting, settingWindow, settingButton);

        this._addEventListeners(domList);
    }
    _addEventListeners(domList) {
        let { helpWindow,
            repeatButton,
            helpButton,
            settingButton,
            startNewGame } = domList;

        startNewGame.addEventListener("click", () => {
            let parent = startNewGame.parentNode;
            parent.classList.add("hidden");
            this.gameOverWindow.initStopwatch();
        });
        helpButton.addEventListener("click", () => {
            helpButton.classList.toggle("active");
            helpWindow.classList.toggle("hidden");
        });
        settingButton.addEventListener("click", () => {
            this._eventBus.emitEvent("settingShow");
        });
        repeatButton.addEventListener("click", () => {
            this._eventBus.emitEvent("restartGame");
        });
    }
}
