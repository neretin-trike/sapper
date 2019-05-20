import Grid from "./grid.js";
import GameOverWindow from "./gameOverWindow.js";
import SettingWindow from "./settingWindow.js";
import RoundInfo from "./roundInfo.js";

import EventBus from "./eventBus.js";

export default class GameScene {
    constructor(domList, gameSetting) {
        this._eventBus = new EventBus();

        let { size,
            bombCount,
            displayTime,
            enabledAnimation } = gameSetting;

        let { 
            helpWindow,
            gameOverWindow,
            settingWindow,
            repeatButton,
            helpButton,
            settingButton,
            playingField,
            roundInfo } = domList;

        const context = playingField.getContext("2d");

        this.roundInfo = new RoundInfo(size, bombCount, roundInfo, displayTime);
        this.grid = new Grid(size, playingField, context, bombCount, enabledAnimation);

        this.gameOverWindow = new GameOverWindow(size, bombCount, gameOverWindow);
        this.settingWindow = new SettingWindow(gameSetting, settingWindow, settingButton);


        helpButton.addEventListener("click", () => {
            helpButton.classList.toggle("active");
            helpWindow.classList.toggle("hidden");
        });
        settingButton.addEventListener("click", () => {
            // settingButton.classList.toggle("active");
            // settingWindow.classList.toggle("hidden");
            
            this._eventBus.emitEvent("settingShow");
        });
        repeatButton.addEventListener("click", () => {
            this._eventBus.emitEvent("restartGame");
        });
    }
}
