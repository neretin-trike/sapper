import GameScene from "./gameScene.js";

window.onload = function () {

    const dom = {
        playingField: document.getElementById("playing-field"),
        gameOverWindow: document.querySelector(".game-over-window")
    }

    dom.playingField.width = 650;
    dom.playingField.height = 650;

    let gameConfig = {
        size: 10,
        bombCount: 10,
        gameOverWindow: dom.gameOverWindow,
        playingField: dom.playingField
    }

    let gameScene = new GameScene(gameConfig);
}