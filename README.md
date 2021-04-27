
WEB Local Storage
===================
[![npm version](https://badge.fury.io/js/webls.svg)](https://badge.fury.io/js/webls)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/adeelakram696/webls/issues)
[![HitCount](http://hits.dwyl.io/adeelakram696/webls.svg)](http://hits.dwyl.io/adeelakram696/webls)
[![downloads][downloads-image]][downloads-url]

[downloads-image]: https://img.shields.io/npm/dt/webls.svg?style=flat
[downloads-url]: https://npmjs.org/package/webls

Web localstorage helps to communicate between localstorage and application, you can manage localstorage with plain, encrypted data with it and can add listeners for keys in on localstorage.
In case localstorage not available then data will be handled in Memory.

----------
Basic useful feature list:

 * Store any kind of data in localstorage/in memory.
 * Encrypt/decrypt data.
 * Add multiple listeners for a key.
 * Typescript.
 * Set encryption key by enviroment variable or by function
 * Can set expiry for a data to check while retrieving

installation
===================

    npm install webls --save

Class Functions
===================
Functions List:

    set(key, data, isJson, encrypt, expiry) // Add data in localstorage/inmem against the given key
    get(key, isJson, isEncrypted, withExpiry) // get the data from localstorage/inmem against the given key
    clear() // clear all data
    exist(key) // give true/false if key exist or not
    remove(key) // remove the key and data from localstorage
    setEncryptKey(key) // set the key on which data will be ecrypted
    addListner(key, callback) // Add listners to the key with callback function
    removeListner(key, callback) // Remove listner from the key with callback function

Params Types:

| Param     | Type | Required   | Default   |
| ------- | ---- | --- | --- |
| key | unique String | Required |  undefined   |
| data | Any | Required |  undefined  |
| isJson | boolean | optional |  true  |
| encrypt | boolean | optional |  false  |
| expiry | Date | optional |  undefined  |
| withExpiry | boolean | optional |  false  |
| callback | (newValue, oldValue, url) => {} | Required |  undefined  |


Coding Example File A
-------------
```javascript
import ls from 'webls';
// for Ecma5 it imports like below
// var ls = require("webls").default;

ls.set('key1','dataHere');
ls.set('key2', { temp: "mydata2" }, true); // to Object
ls.set('key3', { temp: "mydata2" }, true, true); // to save Encrypt
ls.set('key4', { temp: "mydata2" }, true, true, Date('10-12-2029')); // to save with expiry


```
Coding Example File B
-------------
```javascript
import ls from 'webls';
// for Ecma5 it imports like below
// var drawerjs = require("drawerjs").default;

ls.get("key1"); // output: 'dataHere'
ls.get("key2", true); // output: { temp: "mydata2" }
ls.get("key3", true, true); // output: { temp: "mydata2" }
ls.get("key4", true, true, true); // output: {data: { temp: "mydata2" }, isExpired: false}

function listenerCallback(newValue, oldValue, url) => {console.log(newValue, oldValue, url)}
function listenerCallback2(newValue, oldValue, url) => {console.log(newValue, oldValue, url)}
ls.addListener("key2", listenerCallback); // triggers when key2 get updated
ls.addListener("key2", listenerCallback2); // triggers when key2 get updated
ls.removeListener("key2", listenerCallback); // remove the listner function listenerCallback from key2 but listenerCallback2 still 
ls.clear();

```


**License**

    MIT
