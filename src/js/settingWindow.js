import EventBus from "./eventBus.js";
import { saveToLocaleStorage } from "./utils.js";

export default class SettingWindow {
    constructor(setting, dom) {
        this._eventBus = new EventBus();

        this.setting = setting;
        this.settingWindow = dom;

        this._addEventListeners();
    }
    _addEventListeners() {
        let buttonClose = this.settingWindow.querySelector(".button.close");
        let buttonSave = this.settingWindow.querySelector(".button.save");

        buttonClose.addEventListener("click", () => {
            this.settingWindow.classList.add("hidden");

        });
        buttonSave.addEventListener("click", () => {
            this.settingWindow.classList.add("hidden");

            let data = {
                size: this.sizeInputDOM.value,
                bombCount: this.bombInputDOM.value,
                displayTime: this.timInputDOM.checked,
                enabledAnimation: this.animationInputDOM.checked
            }
            saveToLocaleStorage("setting", data)
            location.reload();
        });

        this._eventBus.addEventListener("settingShow", () => {
            this._showSettingWindow();
        })
    }
    _showSettingWindow() {
        let { size,
            bombCount,
            displayTime,
            enabledAnimation } = this.setting;

        this.settingWindow.classList.remove("hidden");

        this.sizeInputDOM = this.settingWindow.querySelector(".setting-size");
        this.bombInputDOM = this.settingWindow.querySelector(".setting-bomb");
        this.timInputDOM = this.settingWindow.querySelector(".setting-time");
        this.animationInputDOM = this.settingWindow.querySelector(".setting-animation");

        this.sizeInputDOM.value = size;
        this.bombInputDOM.value = bombCount;
        this.timInputDOM.checked = displayTime;
        this.animationInputDOM.checked = enabledAnimation;
    }
}