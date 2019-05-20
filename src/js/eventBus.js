
/*
    Реализация класса паттерна Шина событий, имеет открытые методы:
    - Подписаться на события (addEventListener);
    - Отписаться от событий (removeEventListener);
    - Вызвать события (emitEvent);
*/
export default class EventBus {
    constructor() {
        if (EventBus._instance) {
            return EventBus._instance;
        }

        this._callbackList = {};

        EventBus._instance = this;
    }
    addEventListener(event, callback) {
        this._callbackList[event] = callback;
    }
    removeEventListener(event) {
        delete this._callbackList[event];
    }
    emitEvent(eventName, eventData) {
        try {
            this._callbackList[eventName](eventData);
        } catch (e) {
            console.log("Ошибка в методе " + eventName);
        }
    }
}

