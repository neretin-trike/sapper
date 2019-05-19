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
            markUsed: 0,
            countOpen: 0
        }

        this.mediator = new Mediator();

        this.mediator.addEventListener("setInitBombCount", (bombCount)=> {
            this.gameInfo.bombLeft = bombCount;
        })
        this.mediator.addEventListener("markSet", (bomb)=> {
            this.gameInfo.markUsed += 1;

            if (bomb !== null) {
                this.gameInfo.bombLeft -= 1;
            }

            if (this.gameInfo.bombLeft === 0) {
                alert("ИГРА ВЫИГРАНА, ДУРЖОК");
                console.log(this.gameInfo);
            }
        })
        this.mediator.addEventListener("markUnset", (bomb)=> {
            this.gameInfo.markUsed -= 1;

            if (bomb !== null) {
                this.gameInfo.bombLeft += 1;
            }
        })
        this.mediator.addEventListener("openCell", (bomb)=> {

            this.gameInfo.countOpen += 1;

            if (this.gameInfo.countOpen === 90) {
                alert("ИГРА ВЫИГРАНА, ДУРЖОК");
                console.log(this.gameInfo);
            }

            if (bomb !== null) {
                alert("ИГРА ПРОИГРАНА, ДУРЖОК");
                console.log(this.gameInfo);
            }
        })

        EventBus._instance = this;
    }
}

