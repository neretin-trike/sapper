import Grid from "./grid.js";
import EventBus from "./gameState.js";

export default class GameScene {
    constructor(playingField, config) {
        this._eventBus = new EventBus();
        
        let { size, bombCount } = config;
        const context = playingField.getContext("2d");

        let grid = new Grid(size, size, playingField, context);
        grid.placeBombs(bombCount);

        this._eventBus.mediator.emitEvent("setInitBombCount", bombCount);
    }
}
