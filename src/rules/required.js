import * as util from '../util.js';

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
        return typeof val === 'object' && val !== null && !util.isEmptyObject(obj);
    },
    'array': val => {
        return Array.isArray(val) && val.length > 0;
    },
    'string': (val, trim) => {

        var type = typeof val;
        if (type === 'number' && !isNaN(val)) {
            return true;
        }
        if (type === 'string' && val) {
            if (trim) {
                return val.trim() !== '';
            } else {
                return true;
            }
        }
        return false;
    }
}
export default (type, { trim, handler }) => {
    handler = handler ? handler : defaultHandler[type];
    return (value) => {
        if (typeof value === 'undefined') {
            return false;
        }
        return handler(value, type, trim)
    }
}