export class Mediator {
    constructor() {
        this._callbackList = {};
    }
    addEventListener(event, callback) {
        this._callbackList[event] = callback;
    }
    removeEventListener(event, callback) { }
    emitEvent(eventName, eventData) {
        this._callbackList[eventName](eventData);
    }
} 

export default class EventBus {
    constructor () {
        if (EventBus._instance) {
            return EventBus._instance;
        }

        this.gameInfo = {
            time: 0,
            bombLeft: 0,
            markUsed: 0
        }

        this.mediator = new Mediator();

        this.mediator.addEventListener("setInitBombCount", (bombCount)=> {
            this.gameInfo.bombLeft = bombCount;
        })
        this.mediator.addEventListener("markSet", ()=> {
            this.gameInfo.markUsed += 1;
        })
        this.mediator.addEventListener("markUnset", ()=> {
            this.gameInfo.markUsed -= 1;
        })
        this.mediator.addEventListener("bombFind", ()=> {
            this.gameInfo.bombLeft -= 1;
        })
        this.mediator.addEventListener("bombUnFind", ()=> {
            this.gameInfo.bombLeft += 1;
        })
        this.mediator.addEventListener("boom", ()=> {
            alert("ПРОИЗОШОЛ БУМ");
            console.log(this.gameInfo);
        })

        EventBus._instance = this;
    }
}

