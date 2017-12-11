import { isEmptyObject } from '../util.js';
import defaultOptions from '../options.js';
import createRule from './createRule.js';

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
export default createRule('required', function (value, options) {
    return (defaultHandler[this.typeIns.spec.type] || defaultHandler['any'])(value, options)
}, null, defaultOptions.rules.required);