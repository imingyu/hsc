import Rule from '../rules/index.js';
import Options from '../options.js';
import * as util from '../util.js'

export var addRule = (typeIns, ruleName, options) => {
    if (!typeIns.spec.rules[ruleName]) {
        typeIns.spec.rules[ruleName] = true;
        typeIns.rules.push(Rule[ruleName](typeIns.spec.type, typeIns.options.rules[ruleName] ? util.extend(true, Options.rules[ruleName], typeIns.options.rules[ruleName]) : {}));
    }
}

export var fireMessage = (typeIns) => {
}

export var validate = (typeIns, value) => {
    return typeIns.spec.async ? validateSync(typeIns, value) : new Promse((resolve, reject) => {
    });
}
export var validateSync = (typeIns, value) => {
    var result = {
        valid: true,
        label: typeIns.spec.label,
        message: ''
    }
    typeIns.rules.forEach(rule => {
        var ruleResult = rule(value);
        result.valid = result.valid && ruleResult
    })
    return result;
}