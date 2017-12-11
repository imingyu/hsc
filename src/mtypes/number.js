import MAny from './any.js';
import { registerRule, changeType } from './helper.js';


class MNumber extends MAny {
    constructor() {
        super();
        changeType(this, 'number');
    }
}


registerRule(MNumber, ['min', 'max']);

export default MNumber;