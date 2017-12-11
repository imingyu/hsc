import { setItem, getItem } from '../store.js';
import { addRule, validate } from './helper.js';
import { uniqueID } from '../util.js'

class MAny {
    constructor() {
        this.id = uniqueID();

        const DATA = {
            spec: {
                name: '',
                type: 'any',
                label: '',
                async: false,// 是否是异步方式验证
                rules: {}
            },
            rules: {}
        };
        setItem(this.id, DATA); // 私有变量，保护功能
        addRule(this, 'isType', {
            value: DATA.spec.type
        })
    }
    name(val) {
        getItem(this.id).spec.name = val;
        return this;
    }
    label(val) {
        getItem(this.id).spec.label = val;
        return this;
    }
    message(val) {
        getItem(this.id).spec.message = val;
        return this;
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