import MAny from './any.js';
import { registerRule, changeType } from './helper.js';


class MString extends MAny {
    constructor() {
        super();
        changeType(this, 'string');
    }
}


registerRule(MString, ['min', 'max', 'email', 'hex', 'ipv4', 'ipv6', 'ip', 'url', 'time']);

export default MString;