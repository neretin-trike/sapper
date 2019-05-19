import Grid from "./grid.js";

export default class GameScene {
    constructor(playingField) {

        const context = playingField.getContext("2d");

        let grid = new Grid(10, 10, playingField, context);
        grid.placeBombs(10);
    }
}