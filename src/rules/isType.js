import { isObject, isEmptyObject, extend } from '../util.js';
import defaultOptions from '../options.js';
import Rule from './rule.js';
import { getItem } from '../store.js';

var defaultHandler = {
    'any': val => {
        return true;
    },
    'array': val => {
        return Array.isArray(val);
    }
};
['string', 'object', 'boolean', 'number'].forEach(item => {
    defaultHandler[item] = val => {
        return typeof val === item;
    }
})

export default class IsType extends Rule {
    constructor() {
        super('isType', function (value, options) {
            let store = getItem(this.typeIns.id);
            return (defaultHandler[store.spec.type] || defaultHandler['any'])(value, options)
        }, defaultOptions.rules.isType)
    }
}