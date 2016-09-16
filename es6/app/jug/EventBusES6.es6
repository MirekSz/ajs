class EventBus {
    constructor() {
        this.listeners = new Set();
    }

    addListener(listener) {
        let contains = this.listeners.has(listener);
        if (contains) {
            throw new Error('Listener already added');
        }
        this.listeners.add(listener);
    }

    removeListener(listener) {
        this.listeners.delete(listener);
    };

    fire(eventName, eventData) {
        for (var listener of this.listeners) {
            if (listener.eventName === eventName) {
                listener.handle(eventData);
            }
        }
    }
}


export var eb = new EventBus();

var listener = {
    eventName: 'RowSelected', handle: (data)=> {
    }
};
eb.addListener(listener);

eb.fire('RowSelected', {id: 1});
eb.fire('RowSelected', {id: 2});



