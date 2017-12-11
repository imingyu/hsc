import Rules from '../rules/index.js';
import Options from '../options.js';
import { getItem } from '../store.js'

export var addRule = (typeIns, ruleName, options) => {
    new Rules[ruleName]().mount(typeIns, options)
}

export var validate = (typeIns, value) => {
    var store = getItem(typeIns.id)
    return store.spec.async ? new Promse((resolve, reject) => {
    }) : validateSync(typeIns, value);
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