import moment from 'moment';
import * as CryptoJS from './crypto';
import {
  FeedbackType,
  ReturnData,
  GenericObject,
  ILocalStore,
  callbackFn
} from './interfaces';
import MS from './inMem';
import listener from './listener';

const localStore = (): ILocalStore =>  {
  let SKey = process.env.REACT_APP_EK || process.env.ENCRYPT_KEY || 'AjncJASYmnA79a912mP551IbCFnnIlPwh34';

  let ls: Storage = 'localStorage' in global && global.localStorage ? global.localStorage : MS;

  /**
   * @description Set the key for encrypt decrypt data
   * @param {String} key
   * @define key: any generated key
   * @return {void}
   */
  const setEncryptKey = (key: string) => {
    SKey = key;
  }

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
  const set = (
    key: string,
    data: GenericObject | string,
    isJson = true,
    isEncrypted = false,
    expiry: Date,
  ): FeedbackType => {
    let saveData: any = data;
    if (saveData && expiry) {
      saveData = {
        data,
        expiresAt: expiry,
      };
    }
    if (data && (isJson || expiry)) {
      saveData = JSON.stringify(data);
    }
    
    if (saveData && isEncrypted) {
      saveData = CryptoJS.AES.encrypt(saveData, SKey).toString();
    }
    
    try{
      ls.setItem(key, saveData);
      return true;
    } catch(e) {
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
  const get = (
    key: string,
    isJson = true,
    isEncrypted = false,
    withExpiry = false
  ): ReturnData => {
    let jsonParsed: GenericObject = null;
    let data = ls.getItem(key);
    if (data && isEncrypted) {
      const bytes = CryptoJS.AES.decrypt(data.toString(), SKey);
      data = bytes.toString(CryptoJS.encUTF8);
    }
    if (data && (isJson || withExpiry)) {
      jsonParsed = JSON.parse(data);
    }
    if (jsonParsed && withExpiry) {
      const { expiresAt } = jsonParsed;

      // if current time is after the saved expiry
      const isExpired = moment().isAfter(expiresAt);
      jsonParsed = {
        isExpired,
        data: jsonParsed.data,
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
  const remove = (key: string): FeedbackType => {
    try{
      ls.removeItem(key);
      return true;
    } catch(e) {
      return e;
    }
  };

  /**
   * @description check data exists in browser localStorage
   * @param {String} key
   * @define key: Key name for localStorage
   * @return {boolean}
   */
  const exist = (key: string): boolean =>{
    return ls.getItem(key) != null;
  }

  /**
   * @description Clears all the data from localstorage
   * @return {FeedbackType}
   */
  const clear = (): FeedbackType =>{
    try{
      ls.clear();
      return true;
    } catch(e) {
      return e;
    }
  }
  const addListner = (key: string, callBack: callbackFn) => {
    listener.add(key, callBack)
  }
  const removeListner = (key: string, callBack: callbackFn) => {
    listener.remove(key, callBack);
  }
  return {
    addListner,
    clear,
    exist,
    get,
    remove,
    removeListner,
    set,
    setEncryptKey
  }
}
const initial = localStore();
export default initial;
