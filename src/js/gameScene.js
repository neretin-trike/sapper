import Grid from "./grid.js";
import GameOverWindow from "./gameOverWindow.js";
import RoundInfo from "./roundInfo.js";

export default class GameScene {
    constructor(config) {
        let { size, bombCount, gameOverWindow, playingField, roundInfo} = config;
        const context = playingField.getContext("2d");

        this.roundInfo = new RoundInfo(size, bombCount, roundInfo);
        this.grid = new Grid(size, size, playingField, context, bombCount);
        this.gameOverWindow = new GameOverWindow(size, bombCount, gameOverWindow);
    }
}
