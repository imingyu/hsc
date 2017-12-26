import { isObject, isEmptyObject, extend } from '../util.js';
import defaultOptions from '../options.js';
import Rule from './rule.js';
import { getItem } from '../store.js';

export default class Value extends Rule {
    constructor() {
        super('value', function (value, options, callback) {
            return options.value(value, getItem(this.typeIns.id).spec.type, callback);
        }, defaultOptions.rules.value)
    }

    mount(typeIns, mountOptions, isAsync) {
        if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
            extend(true, this.mountedOptions, mountOptions)
        } else if (typeof mountOptions === 'function') {
            this.mountedOptions.value = mountOptions;
        }
        if (typeof isAsync === 'boolean') {
            this.mountedOptions.async = isAsync;
        }
        super.mount(typeIns);
    }
}