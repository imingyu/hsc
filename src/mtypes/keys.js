import MAny from './any.js';
import { registerRule, changeType, mergeTypes, validate, validateSync } from './helper.js';
import { setItem, getItem } from '../store.js';

class MKeys extends MAny {
    constructor() {
        super();
        changeType(this, 'object');
    }

    keys(obj) {
        var store = getItem(this.id);
        store.keys = store.keys || {};//保存key实例，每个key实例其实就是一个MAny的子类实例
        for (let prop in obj) {
            if (obj[prop] instanceof MAny) {
                if (store.keys[prop]) {
                    store.keys[prop].merge(obj[prop]);
                } else {
                    store.keys[prop] = obj[prop]
                }
                var item = store.keys[prop];
                store.spec.async = getItem(item.id).spec.async;//同步异步性
            }
        }
        return this;
    }
    key(name, value) {
        var store = getItem(this.id);
        var item = store.keys[name];
        if (value) {
            item.merge(value);
            return this;
        } else {
            return item;
        }
    }
    validateKey(key, value, callback) {
        var item = this.key(key);
        if (item) {
            return item.validate(value, callback);
        }
    }
    validate(value, callback) {
        var store = getItem(this.id);
        if (store.spec.async) {
            validate(this, value, validResult => {
                validResult.keys = {};

                var keyTypes = Object.keys(store.keys).map(item => {
                    return store.keys[item];
                })

                var execSize = 0;
                var checkIsEnd = () => {
                    execSize++;
                    if (execSize >= keyTypes.length) {
                        if (isFunction(callback)) {
                            callback(validResult);
                        }
                    }
                }
                keyTypes.forEach(item => {
                    item.validate(value[key], result => {
                        validResult.keys[key] = result;
                        validResult.valid = validResult.valid && validResult.keys[key].valid;
                        checkIsEnd();
                    });
                });
            });
        } else {
            var validResult = validate(this, value);
            validResult.keys = {};
            for (let key in store.keys) {
                validResult.keys[key] = store.keys[key].validate(value[key]);
                validResult.valid = validResult.valid && validResult.keys[key].valid;
            }
            return validResult;
        }
    }
}


registerRule(MKeys, []);

export default MKeys;