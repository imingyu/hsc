import Required from './required.js';
import IsType from './isType.js';
import AsyncRule from './async.js';
import Min from './min.js';
import Max from './max.js';

var Rules = {
    required: Required,
    isType: IsType,
    'async': AsyncRule,
    min: Min,
    max: Max
}
export default Rules;