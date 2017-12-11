import { getItem } from '../store.js';
import { extend, formatString } from '../util.js'

export default class Rule {
    constructor(name, handler, options) {
        this.name = name;
        this.handler = handler;
        this.options = options || {};
    }

    mount(typeIns) {
        this.typeIns = typeIns;
        let store = getItem(typeIns.id);
        if (this.options.async) {
            store.spec.async = true;
        }
        if (!store.spec.rules[this.name]) {
            store.spec.rules[this.name] = true;
            store.rules[this.name] = this;
        }
    }

    validate(value, validateOptions) {
        let computedOptions = this.computeOptions(validateOptions);
        let store = getItem(this.typeIns.id);
        let message = computedOptions.message;
        let messageValues = {
            value,
            name: store.spec.name,
            label: store.spec.label,
            type: store.spec.type,
            ruleName: this.name,
            ruleLabel: computedOptions.label
        }
        if (typeof message === 'function') {
            message = message(messageValues)
        }
        message = message ? formatString(message + '', messageValues) : '';

        const validResult = this.handler.call(this, value, computedOptions);
        if (typeof validResult === 'boolean') {
            return {
                valid: validResult,
                message: message,
                options: computedOptions
            }
        } else if (typeof validResult === 'object') {
            validResult.options = computedOptions;
            validResult.message = validResult.message || message;
            return validResult;
        } else {
            throw new Error('验证规则返回值无效！')
        }
    }

    computeOptions(...args) {
        return extend.apply(null, [true, {}, this.options, ...args]);
    }
}