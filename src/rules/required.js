import { isObject, isEmptyObject, extend } from '../util.js';
import defaultOptions from '../options.js';
import Rule from './rule.js';
import { getItem } from '../store.js';

var defaultHandler = {
    'any': val => {
        return defaultHandler.number(val) || defaultHandler.boolean(val) || defaultHandler.object(val) || defaultHandler.array(val) || defaultHandler.string(val);
    },
    'number': val => {
        return typeof val === 'number' && !isNaN(val);
    },
    'boolean': val => {
        return typeof val === 'boolean';
    },
    'object': val => {
        return typeof val === 'object' && val !== null && !isEmptyObject(obj);
    },
    'array': val => {
        return Array.isArray(val) && val.length > 0;
    },
    'string': (val, trimString) => {
        var type = typeof val;
        if (type === 'number' && !isNaN(val)) {
            return true;
        }
        if (type === 'string' && val) {
            if (trimString) {
                return val.trim() !== '';
            } else {
                return true;
            }
        }
        return false;
    }
}
export default class Required extends Rule {
    constructor() {
        super('required', function (value, options) {
            let store = getItem(this.typeIns.id);
            return (defaultHandler[store.spec.type] || defaultHandler['any'])(value, options)
        }, defaultOptions.rules.required)
    }

    mount(typeIns, mountOptions) {
        this.mountedOptions = this.mountedOptions || {};
        if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
            extend(true, this.mountedOptions, mountOptions)
        } else if (typeof mountOptions === 'string') {
            this.mountedOptions.message = mountOptions;
        } else if (typeof mountOptions === 'boolean') {
            this.mountedOptions.value = mountOptions;
        }
        super.mount(typeIns);
    }
}