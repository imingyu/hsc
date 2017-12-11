import { isObject, isEmptyObject, extend, formatString } from '../util.js'

export default function createRule(ruleName, ruleHandler, mounthandler, ruleOptions = {}) {
    class Rule {
        constructor() {
            this.name = ruleName;
            this.handler = ruleHandler;
            this.options = ruleOptions;
        }

        mount(typeIns, mountOptions) {
            this.typeIns = typeIns;
            if (ruleOptions.async) {
                typeIns.spec.async = true;
            }
            if (typeof mounthandler === 'function') {
                mountOptions = mounthandler.apply(this, [typeIns, mountOptions])
            }
            if (isObject(mountOptions) && !isEmptyObject(mountOptions)) {
                this.mountOptions = this.mountOptions || {}
                extend(true, this.mountOptions, mountOptions)
            }
            if (!typeIns.spec.rules[this.name]) {
                typeIns.spec.rules[this.name] = true;
                typeIns.rules.push(this);
            }
        }

        validate(value, validateOptions) {
            let computedOptions = this.computeOptions(validateOptions);
            let message = computedOptions.message;
            let messageValues = {
                value,
                name: this.typeIns.spec.name,
                label: this.typeIns.spec.label,
                type: this.typeIns.spec.type,
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
            return extend.apply(null, [true, {}, this.options, this.mountOptions, ...args]);
        }
    }
    Rule.displayName = ruleName;
    return Rule;
}