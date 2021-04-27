import { GenericObject } from "./interfaces";

const inMem = (): Storage => {
  let ms: GenericObject;
  let length: number;
  const getItem = (key: string) => {
    return key in ms ? ms[key] : null;
  }
  
  const setItem  = (key: string, value: string) => {
    ms[key] = value;
    length = Object.keys(ms).length;
    return true;
  }
  
  const removeItem = (key: string) => {
    var found = key in ms;
    if (found) {
      delete ms[key];
      length = Object.keys(ms).length;
      return true;
    }
    return false;
  }
  
  const clear = () => {
    ms = {};
    length = 0
    return true;
  }

  const key = (index: number) => {
    const arr = Object.keys(ms);
    return arr[index];
  }
  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    length,
  }
}
const initialized = inMem();
export default initialized;
