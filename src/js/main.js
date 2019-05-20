import GameScene from "./gameScene.js";
import { loadFromLocalStorage } from "./utils.js";

/*
    Точка входа в приложение, в которой происходит
    поиск необходимых DOM элементов; загрузка настроек 
    из localStorage и создание игровой сцены
*/
window.onload = function () {

    const domList = {
        roundInfo: document.querySelector(".round-info"),
        playingField: document.getElementById("playing-field"),
        helpWindow: document.querySelector(".help-window"),
        gameOverWindow: document.querySelector(".game-over-window"),
        settingWindow: document.querySelector(".setting-window"),
        helpButton: document.querySelector(".help.menu-button"),
        repeatButton: document.querySelector(".repeat.menu-button"),
        settingButton: document.querySelector(".setting.menu-button"),
        startNewGame: document.querySelector(".start-window .button")
    }

    let gameSetting = loadFromLocalStorage("setting");
    if (gameSetting === undefined) {
        gameSetting = {
            size: 10,
            bombCount: 10,
            displayTime: true,
            enabledAnimation: true
        }
    }

    let gameScene = new GameScene(domList, gameSetting);
}