import { addRule, validate } from './helper.js';
import * as util from '../util.js'

export default class MAny {
    constructor() {
        this.options = {
            rules: {}
        };
        this.spec = {
            type: 'any',
            async: false,// 是否是异步方式验证
            rules: {},
            keys: {}
        }
        this.rules = [];
        addRule(this, 'isType')
    }
    label(val) {
        this.spec.label = val;
    }
    message() {
    }
    required(trim, handler) {
        var ruleName = 'required'
        if (this.spec.rule[ruleName]) return;
        this.options.rules[ruleName] = this.options.rules[ruleName] || {}
        if (typeof trim !== 'undefined') {
            this.options.rules[ruleName].trim = trim;
        }
        if (typeof handler !== 'undefined') {
            this.options.rules[ruleName].handler = handler;
        }
        addRule(this, ruleName)
    }
    validate(value) {
        return validate(this, value)
    }
}