import { setItem, getItem } from '../store.js';
import { mountRule, validate, registerRule } from './helper.js';
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
    validate(...args) {
        return validate.apply(null, [this, ...args])
    }
}

registerRule(MAny, ['required', 'async']);

export default MAny;