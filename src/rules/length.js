import { isObject, isEmptyObject, extend } from '../util.js';
import defaultOptions from '../options.js';
import Rule from './rule.js';
import { getItem } from '../store.js';

var defaultHandler = {
    'any': (target, limit) => {
        var obj = Object(target);
        return obj.hasOwnProperty('length') && obj.length === limit;
    },
    'array': (target, limit) => {
        return target && target.length === limit;
    },
    'string': (target, limit) => {
        return typeof target === 'string' && target.length === limit;
    }
};

export default class Length extends Rule {
    constructor() {
        super('length', function (value, options) {
            let store = getItem(this.typeIns.id);
            return (defaultHandler[store.spec.type] || defaultHandler['any'])(value, options.value, options)
        }, defaultOptions.rules.length)
    }
}