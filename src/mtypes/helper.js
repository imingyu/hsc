import Rule from '../rules/index.js';
import Options from '../options.js';
import * as util from '../util.js'

export var addRule = (typeIns, ruleName, options) => {
    new Rule[ruleName]().mount(typeIns, options)
}

export var validate = (typeIns, value) => {
    return typeIns.spec.async ? new Promse((resolve, reject) => {
    }) : validateSync(typeIns, value);
}
export var validateSync = (typeIns, value) => {
    var result = {
        valid: true,
        label: typeIns.spec.label,
        rules: {},
        message: ''
    }
    typeIns.rules.forEach(rule => {
        result.rules[rule.name] = rule.validate(value);
        result.valid = result.valid && result.rules[rule.name].valid;
    });
    return result;
}