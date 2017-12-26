import defaultOptions from '../options.js';
import Rule from './rule.js';

var rules = {};
Object.keys(defaultOptions.regexes).forEach(item => {
    class RegexRule extends Rule {
        constructor() {
            super(item, function (value, options) {
                return typeof value === 'string' && defaultOptions.regexes[item].test(value);
            }, defaultOptions.rules[item]);
        }
    }
    rules[item] = RegexRule;
})

class Ip extends Rule {
    constructor() {
        super('ip', function (value, options) {
            return typeof value === 'string' && (defaultOptions.regexes.ipv4.test(value) || defaultOptions.regexes.ipv6.test(value));
        }, defaultOptions.rules.ip);
    }
}
rules.ip = Ip;
export default rules