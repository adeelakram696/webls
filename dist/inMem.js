"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var inMem = function inMem() {
  var ms;
  var length;

  var getItem = function getItem(key) {
    return key in ms ? ms[key] : null;
  };

  var setItem = function setItem(key, value) {
    ms[key] = value;
    length = Object.keys(ms).length;
    return true;
  };

  var removeItem = function removeItem(key) {
    var found = (key in ms);

    if (found) {
      delete ms[key];
      length = Object.keys(ms).length;
      return true;
    }

    return false;
  };

  var clear = function clear() {
    ms = {};
    length = 0;
    return true;
  };

  var key = function key(index) {
    var arr = Object.keys(ms);
    return arr[index];
  };

  return {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    key: key,
    length: length
  };
};

var initialized = inMem();
var _default = initialized;
exports["default"] = _default;