import defaultOptions from '../options.js';
import createRule from './createRule.js';

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
export default createRule('isType', function (value, options) {
    return (defaultHandler[this.typeIns.spec.type] || defaultHandler['any'])(value, options)
}, false, defaultOptions.rules.isType);