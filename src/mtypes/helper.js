import Rules from '../rules/index.js';
import Options from '../options.js';
import { getItem } from '../store.js';
import { isFunction } from '../util.js';

export var registerRule = (mtype, rules) => {
    rules.forEach(ruleName => {
        if (Rules[ruleName]) {
            mtype.prototype[ruleName] = function (...args) {
                mountRule.apply(null, [this, ruleName, ...args]);
                return this;
            }
        }
    });
}

export var mountRule = (typeIns, ruleName, options) => {
    new Rules[ruleName]().mount(typeIns, options)
}

export var changeType = (typeIns, type) => {
    getItem(typeIns.id).spec.type = type;
    mountRule(typeIns, 'isType', {
        value: type
    })
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
        name: store.spec.name,
        label: store.spec.label,
        rules: {}
    }
    Object.keys(store.rules).forEach(name => {
        let rule = store.rules[name]
        result.rules[name] = rule.validate(value);
        result.valid = result.valid && result.rules[name].valid;
    });
    return result;
}

export var mergeTypes = (...types) => {
    var result;
    types.forEach(type => {
    });
    return result;
}