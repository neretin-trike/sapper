import Grid from "./grid.js";
import GameOverWindow from "./gameOverWindow.js";

export default class GameScene {
    constructor(config) {
        let { size, bombCount, gameOverWindow, playingField} = config;
        const context = playingField.getContext("2d");

        this.grid = new Grid(size, size, playingField, context, bombCount);
        this.gameOverWindow = new GameOverWindow(size, bombCount, gameOverWindow);
    }
}
