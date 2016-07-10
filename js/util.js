class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  emit(name) {
    var args = [];
    var count = 1;
    var length = arguments.length;

    for(; count < length; count++) {
      args.push(arguments[count]);
    }

    (this.listeners[name] || []).forEach(function(f) {
      f.apply(this, args);
    }, this);
  }

  on(name, listener) {
    if(!this.listeners[name])
      this.listeners[name] = [];
    this.listeners[name].push(listener);
    return listener;
  }

  remove(name, listener) {
    if(!this.listeners[name] || this.listeners[name].indexOf(listener) === -1)
      return null;
    return this.listeners[name].splice(this.listeners[name].indexOf(listener), 1);
  }
}
