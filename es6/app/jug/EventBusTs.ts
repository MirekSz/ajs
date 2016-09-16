interface Listener {
    eventName: string;
    handle: (data: any)=>void;
}
class EventBus<L extends Listener> {
    private listeners: Set<L> = new Set();


    addListener(listener: L) {
        let contains = this.listeners.has(listener);
        if (contains) {
            throw new Error('Listener already added');
        }
        this.listeners.add(listener);
    }

    removeListener(listener: L) {
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



