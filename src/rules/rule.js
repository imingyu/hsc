import { getItem } from '../store.js';
import { extend, formatString, isFunction } from '../util.js';

var getValidResult = (validResult, message, computedOptions) => {
    if (typeof validResult === 'boolean') {
        return {
            valid: validResult,
            message: message,
            options: computedOptions
        }
    } else if (typeof validResult === 'object') {
        validResult.message = validResult.message || message;
        validResult.options = computedOptions;
        return validResult;
    } else {
        console.error('验证规则返回值无效！')
    }
}

export default class Rule {
    constructor(name, handler, options) {
        this.name = name;
        this.handler = handler;
        this.options = options || {};
        this.mountedOptions = {}
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

    validate(value, callback) {
        let computedOptions = this.computeOptions();
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

        if (this.options.async) {
            this.handler.call(this, value, computedOptions, (validResult) => {
                var result = getValidResult(validResult, message, computedOptions);
                if (isFunction(callback)) {
                    callback(result)
                }
            });
        } else {
            return getValidResult(this.handler.call(this, value, computedOptions), message, computedOptions);
        }
    }

    computeOptions(...args) {
        return extend.apply(null, [true, {}, this.options, this.mountedOptions, ...args]);
    }
}