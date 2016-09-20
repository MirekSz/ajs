function EventBus() {
    this.listeners = new Set();
}

EventBus.prototype.addListener = function (listener) {
    this.listeners.add(listener);
};

EventBus.prototype.removeListener = function (listener) {
    this.listeners.delete(listener);
};

EventBus.prototype.fire = function (eventName, eventData) {
    for (var listener of this.listeners) {
        if (listener.eventName === eventName) {
            listener.handle(eventData);
        }
    }
};

export var eb = new EventBus();


var listener = {
    eventName: 'RowSelected', handle: function (data) {
    }
};
eb.addListener(listener);

eb.fire('RowSelected', {id: 1});
eb.fire('RowSelected', {id: 2});

eb.removeListener(listener);

eb.fire('RowSelected', {id: 3});
