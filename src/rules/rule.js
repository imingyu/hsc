import { getItem } from '../store.js';
import { extend, formatString, isFunction, isObject, isEmptyObject } from '../util.js';

var getValidResult = (validResult, message, computedOptions) => {
    if (typeof validResult === 'boolean') {
        return {
            valid: validResult,
            message: !validResult ? message : '',
            options: computedOptions
        }
    } else if (typeof validResult === 'object') {
        validResult.message = validResult.message || (!validResult.valid ? message : '');
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

    mount(typeIns, mountOptions) {
        this.typeIns = typeIns;
        if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
            extend(true, this.mountedOptions, mountOptions)
        } else {
            this.mountedOptions.value = mountOptions;
        }
        let store = getItem(typeIns.id);
        var options = this.computeOptions();
        if (options.async) {
            store.spec.async = true;
        }
        store.rules[this.name] = this;
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
            ruleValue: this.mountedOptions.value,
            ruleLabel: computedOptions.label
        }
        if (isObject(message)) {
            message = message[store.spec.type] ? message[store.spec.type] : message['any'];
        }
        if (isFunction(message)) {
            message = message(messageValues);
        } else if (typeof message === 'string') {
            message = formatString(message + '', messageValues);
        }
        message = message ? message : '';

        if (computedOptions.async) {
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