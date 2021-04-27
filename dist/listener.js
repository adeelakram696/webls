"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var listener = function listener() {
  var listeners = {};
  var listening = false;

  var listen = function listen() {
    if (global.addEventListener) {
      global.addEventListener('storage', change, false);
    } else {
      global.onstorage = change;
    }
  };

  var change = function change(e) {
    if (!e) {
      e = global.event;
    }

    var all = listeners[e.key];

    if (all) {
      all.forEach(fire);
    }

    function fire(listener) {
      listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri);
    }
  };

  var add = function add(key, fn) {
    if (listeners[key]) {
      listeners[key].push(fn);
    } else {
      listeners[key] = [fn];
    }

    if (listening === false) {
      listen();
    }
  };

  var remove = function remove(key, fn) {
    var ns = listeners[key];

    if (ns.length > 1) {
      ns.splice(ns.indexOf(fn), 1);
    } else {
      listeners[key] = [];
    }
  };

  return {
    add: add,
    remove: remove
  };
};

var initialized = listener();
var _default = initialized;
exports["default"] = _default;