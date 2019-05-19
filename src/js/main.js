import GameScene from "./gameScene.js";
import { loadFromLocalStorage } from "./utils.js";

window.onload = function () {

    const domList = {
        roundInfo: document.querySelector(".round-info"),
        playingField: document.getElementById("playing-field"),
        gameOverWindow: document.querySelector(".game-over-window"),
        settingWindow: document.querySelector(".setting-window"),
        repeatButton: document.querySelector(".repeat.menu-button"),
        settingButton: document.querySelector(".setting.menu-button")
    }

    let gameSetting = loadFromLocalStorage("setting");
    if (gameSetting === undefined) {
        gameSetting = {
            size: 10,
            bombCount: 10,
            displayTime: true,
            enabledAnimation: false
        }
    }

    let gameScene = new GameScene(domList, gameSetting);
}