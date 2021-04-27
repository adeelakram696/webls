"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var CryptoJS = _interopRequireWildcard(require("./crypto"));

var _inMem = _interopRequireDefault(require("./inMem"));

var _listener = _interopRequireDefault(require("./listener"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localStore = function localStore() {
  var SKey = process.env.REACT_APP_EK || process.env.ENCRYPT_KEY || 'AjncJASYmnA79a912mP551IbCFnnIlPwh34';
  var ls = 'localStorage' in global && global.localStorage ? global.localStorage : _inMem["default"];
  /**
   * @description Set the key for encrypt decrypt data
   * @param {String} key
   * @define key: any generated key
   * @return {void}
   */

  var setEncryptKey = function setEncryptKey(key) {
    SKey = key;
  };
  /**
   * @description Save data into browser localStorage
   * @param {String} key
   * @param {GenericObject} data
   * @param {boolean} isJson
   * @param {boolean} isEncrypted
   * @param {Date} expiry
   * @define key: Key name for localStorage
   * @define data: any kind of data to store in localStorage
   * @define isJson: if data is Json then it should if true else false
   * @define isEncrypted: if data needs to be encrypted then mark as true
   * @define expiry: set expiry time to check while getting
   * @return {FeedbackType}
   */


  var set = function set(key, data) {
    var isJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var isEncrypted = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var expiry = arguments.length > 4 ? arguments[4] : undefined;
    var saveData = data;

    if (saveData && expiry) {
      saveData = {
        data: data,
        expiresAt: expiry
      };
    }

    if (data && (isJson || expiry)) {
      saveData = JSON.stringify(data);
    }

    if (saveData && isEncrypted) {
      saveData = CryptoJS.AES.encrypt(saveData, SKey).toString();
    }

    try {
      ls.setItem(key, saveData);
      return true;
    } catch (e) {
      return e;
    }
  };
  /**
   * @description Get data from browser localStorage
   * @param {String} key
   * @param {boolean} isJson
   * @param {boolean} isEncrypted
   * @param {boolean} withExpiry
   * @define key: Key name for localStorage
   * @define isJson: if data is Json then it should if true else false
   * @define isEncrypted: if data is encrypted then mark as true
   * @define withExpiry: if data save with expiry then it will response with isExpired key
   * @return {ReturnData}
   */


  var get = function get(key) {
    var isJson = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var isEncrypted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var withExpiry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var jsonParsed = null;
    var data = ls.getItem(key);

    if (data && isEncrypted) {
      var bytes = CryptoJS.AES.decrypt(data.toString(), SKey);
      data = bytes.toString(CryptoJS.encUTF8);
    }

    if (data && (isJson || withExpiry)) {
      jsonParsed = JSON.parse(data);
    }

    if (jsonParsed && withExpiry) {
      var _jsonParsed = jsonParsed,
          expiresAt = _jsonParsed.expiresAt; // if current time is after the saved expiry

      var isExpired = (0, _moment["default"])().isAfter(expiresAt);
      jsonParsed = {
        isExpired: isExpired,
        data: jsonParsed.data
      };
    }

    return jsonParsed || data;
  };
  /**
   * @description Remove data from browser localStorage
   * @param {String} key
   * @define key: Key name for localStorage
   * @return {FeedbackType}
   */


  var remove = function remove(key) {
    try {
      ls.removeItem(key);
      return true;
    } catch (e) {
      return e;
    }
  };
  /**
   * @description check data exists in browser localStorage
   * @param {String} key
   * @define key: Key name for localStorage
   * @return {boolean}
   */


  var exist = function exist(key) {
    return ls.getItem(key) != null;
  };
  /**
   * @description Clears all the data from localstorage
   * @return {FeedbackType}
   */


  var clear = function clear() {
    try {
      ls.clear();
      return true;
    } catch (e) {
      return e;
    }
  };

  var addListner = function addListner(key, callBack) {
    _listener["default"].add(key, callBack);
  };

  var removeListner = function removeListner(key, callBack) {
    _listener["default"].remove(key, callBack);
  };

  return {
    addListner: addListner,
    clear: clear,
    exist: exist,
    get: get,
    remove: remove,
    removeListner: removeListner,
    set: set,
    setEncryptKey: setEncryptKey
  };
};

var initial = localStore();
var _default = initial;
exports["default"] = _default;