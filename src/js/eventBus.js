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
        this._callbackList[eventName](eventData);
    }
}

