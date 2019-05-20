import GameScene from "./gameScene.js";
import { loadFromLocalStorage } from "./utils.js";

window.onload = function () {

    const domList = {
        roundInfo: document.querySelector(".round-info"),
        playingField: document.getElementById("playing-field"),
        helpWindow: document.querySelector(".help-window"),
        gameOverWindow: document.querySelector(".game-over-window"),
        settingWindow: document.querySelector(".setting-window"),
        helpButton: document.querySelector(".help.menu-button"),
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