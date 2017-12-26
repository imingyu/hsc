import { setItem, getItem } from '../store.js';
import { mountRule, validate, registerRule, mergeTypes } from './helper.js';
import { uniqueID } from '../util.js'

class MAny {
    constructor() {
        this.id = uniqueID();

        const DATA = {
            spec: {
                name: '',
                type: 'any',
                label: '',
                async: false// 是否是异步方式验证
            },
            rules: {}//保存rule实例
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
    merge(...types) {
        //合并类型：后面传递的的配置项的值会覆盖签名相同配置项的值
        mergeTypes.apply(null, [this, ...types]);
    }
    validate(...args) {
        return validate.apply(null, [this, ...args]);
    }
}

registerRule(MAny, ['required', 'async']);

export default MAny;