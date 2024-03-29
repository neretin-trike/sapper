import EventBus from "./eventBus.js";
import { saveToLocaleStorage, isNumeric } from "./utils.js";

/*
    Реализация класса окна настроек игры, отображает текущие 
    настройки и позволяет их изменять
*/
export default class SettingWindow {
    constructor(setting, dom, settingMenu) {
        this._eventBus = new EventBus();

        this.setting = setting;
        this.settingWindow = dom;
        this.settingMenu = settingMenu;

        this._addEventListeners();
    }
    _addEventListeners() {
        let buttonClose = this.settingWindow.querySelector(".button.close");
        let buttonSave = this.settingWindow.querySelector(".button.save");

        buttonClose.addEventListener("click", () => {
            this.settingMenu.classList.toggle("active");
            this.settingWindow.classList.toggle("hidden");
            this._eventBus.emitEvent("continuewatchPause");
        });
        buttonSave.addEventListener("click", () => {
            this.settingWindow.classList.add("hidden");

            let data = {
                size: this.sizeInputDOM.value,
                bombCount: this.bombInputDOM.value,
                displayTime: this.timInputDOM.checked,
                enabledAnimation: this.animationInputDOM.checked
            }
            saveToLocaleStorage("setting", data);
            location.reload();
        });

        this._eventBus.addEventListener("settingShow", () => {
            this._showSettingWindow();
            this._eventBus.emitEvent("stopwatchPause");
        })

        this.sizeInputDOM = this.settingWindow.querySelector(".setting-size");
        this.bombInputDOM = this.settingWindow.querySelector(".setting-bomb");

        this.sizeInputDOM.addEventListener("change", () => {
            let bombIntValue = parseInt(this.bombInputDOM.value);
            let sizeIntValue = parseInt(this.sizeInputDOM.value);

            if (sizeIntValue < bombIntValue) {
                this.bombInputDOM.value = sizeIntValue;
            } else {

            }
        })
        this.bombInputDOM.addEventListener("change", () => {
            let sizeIntValue = parseInt(this.sizeInputDOM.value);
            if (isNumeric(this.bombInputDOM.value)) {
                let bombIntValue = parseInt(this.bombInputDOM.value);

                if (bombIntValue < sizeIntValue) {
                    this.bombInputDOM.value = sizeIntValue;
                }
            } else {
                this.bombInputDOM.value = 1;
            }
        })
    }
    _showSettingWindow() {
        let { size,
            bombCount,
            displayTime,
            enabledAnimation } = this.setting;

        this.settingMenu.classList.toggle("active");
        this.settingWindow.classList.toggle("hidden");

        this.timInputDOM = this.settingWindow.querySelector(".setting-time");
        this.animationInputDOM = this.settingWindow.querySelector(".setting-animation");

        this.sizeInputDOM.value = size;
        this.bombInputDOM.value = bombCount;
        this.timInputDOM.checked = displayTime;
        this.animationInputDOM.checked = enabledAnimation;
    }
}