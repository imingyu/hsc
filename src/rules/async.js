import { isObject, isEmptyObject, extend } from '../util.js';
import defaultOptions from '../options.js';
import Rule from './rule.js';
import { getItem } from '../store.js';

export default class AsyncRule extends Rule {
    constructor() {
        super('async', function (value, options, callback) {
            console.log(`start AsyncRule`)
            setTimeout(() => {
                callback(true)
            }, 3 * 1000)
        }, {
            async: true
        });
    }
}