import { isObject, isEmptyObject, extend } from '../util.js';
import defaultOptions from '../options.js';
import Rule from './rule.js';
import { getItem } from '../store.js';

var defaultHandler = {
    'any': (target, limit) => {
        return true;
    },
    'array': (target, limit) => {
        return target && target.length >= limit ? true : false;
    },
    'string': (target, limit) => {
        return target && target.length >= limit ? true : false;
    },
    'number': (target, limit) => {
        if (typeof target === 'number') {
            return target >= limit;
        }
        if (typeof target === 'string') {
            return isNaN(target) ? false : target >= limit;
        }
        if (target && (target).valueOf) {
            return (target).valueOf() >= limit;
        }
        return false;
    }
};

export default class Min extends Rule {
    constructor() {
        super('min', function (value, options) {
            let store = getItem(this.typeIns.id);
            return (defaultHandler[store.spec.type] || defaultHandler['any'])(value, options.value, options)
        }, defaultOptions.rules.min)
    }

    mount(typeIns, mountOptions) {
        if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
            extend(true, this.mountedOptions, mountOptions)
        } else if (typeof mountOptions === 'number') {
            this.mountedOptions.value = mountOptions;
        }
        super.mount(typeIns);
    }
}