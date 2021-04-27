
const listener = () => {
  let listeners = {};
  let listening = false;
  const listen = () => {
    if (global.addEventListener) {
      global.addEventListener('storage', change, false);
    } else {
      global.onstorage = change;
    }
  }

  const change = (e) => {
    if (!e) {
      e = global.event;
    }
    var all = listeners[e.key];
    if (all) {
      all.forEach(fire);
    }

    function fire (listener) {
      listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri);
    }
  }

  const add = (key, fn) => {
    if (listeners[key]) {
      listeners[key].push(fn);
    } else {
      listeners[key] = [fn];
    }
    if (listening === false) {
      listen();
    }
  }

  const remove = (key, fn) => {
    var ns = listeners[key];
    if (ns.length > 1) {
      ns.splice(ns.indexOf(fn), 1);
    } else {
      listeners[key] = [];
    }
  }
  return {
    add,
    remove,
  }
}
const initialized = listener();
export default initialized;

