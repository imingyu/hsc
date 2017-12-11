import { addRule, validate } from './helper.js';
import * as util from '../util.js'

class MAny {
    constructor() {
        this.spec = {
            name: '',
            type: 'any',
            label: '',
            async: false,// 是否是异步方式验证
            rules: {}
        }
        this.rules = [];
        addRule(this, 'isType')
    }
    name(val) {
        this.spec.name = val;
    }
    label(val) {
        this.spec.label = val;
    }
    message(val) {
        this.spec.message = val;
    }
    validate(value) {
        return validate(this, value)
    }
}

['required'].forEach(ruleName => {
    MAny.prototype[ruleName] = function (...args) {
        addRule.apply(null, [this, ruleName, ...args]);
        return this;
    }
});

export default MAny;