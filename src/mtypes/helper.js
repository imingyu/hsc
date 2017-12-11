import Rules from '../rules/index.js';
import Options from '../options.js';
import { getItem } from '../store.js';
import { isFunction } from '../util.js';

export var addRule = (typeIns, ruleName, options) => {
    new Rules[ruleName]().mount(typeIns, options)
}

export var validate = (typeIns, value, callback) => {
    var store = getItem(typeIns.id)
    if (store.spec.async) {
        var result = {
            valid: true,
            label: store.spec.label,
            rules: {},
            message: store.spec.message
        }

        var asyncRules = [];
        Object.keys(store.rules).forEach(name => {
            let rule = store.rules[name];
            if (rule.options.async) {
                asyncRules.push(rule)
            } else {
                result.rules[name] = rule.validate(value);
                result.valid = result.valid && result.rules[name].valid;
            }
        });

        var execSize = 0;
        var checkIsEnd = () => {
            execSize++;
            if (execSize >= asyncRules.length) {
                if (isFunction(callback)) {
                    callback(result)
                }
            }
        }

        asyncRules.forEach(rule => {
            rule.validate(value, validResult => {
                result.rules[rule.name] = validResult;
                result.valid = result.valid && result.rules[rule.name].valid;
                checkIsEnd()
            });
        })
    } else {
        return validateSync(typeIns, value);
    }
}
export var validateSync = (typeIns, value) => {
    var store = getItem(typeIns.id)
    var result = {
        valid: true,
        label: store.spec.label,
        rules: {},
        message: store.spec.message
    }
    Object.keys(store.rules).forEach(name => {
        let rule = store.rules[name]
        result.rules[name] = rule.validate(value);
        result.valid = result.valid && result.rules[name].valid;
    });
    return result;
}