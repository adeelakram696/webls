export declare type GenericObject = {
    [key: string]: any;
};
export declare type FeedbackType = boolean | Error;
export declare type ReturnData = GenericObject | string | null;
export declare type dataType = GenericObject | string;
export declare type callbackFn = (newValue?: dataType, oldValue?: dataType, url?: string) => {};
export interface ILocalStore {
    set: (key: string, data: dataType, isJson?: boolean, isEncrypted?: boolean, expiry?: Date) => FeedbackType;
    get: (key: string, isJson?: boolean, isEncrypted?: boolean, withExpiry?: boolean) => ReturnData;
    remove: (key: string) => FeedbackType;
    exist: (key: string) => boolean;
    clear: () => FeedbackType;
    addListner: (key: string, callBack: callbackFn) => void;
    removeListner: (key: string, callBack: callbackFn) => void;
    setEncryptKey: (key: string) => void;
}
