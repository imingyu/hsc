import MType from './mtypes/index.js';
import { version } from '../package.json';
const MSchema = {
    version,
    validate(value, schema, callback) {
        if (schema) {
            return schema.validate(value, callback);
        } else {
            return true;
        }
    }
};
['any', 'string', 'number', 'object', 'boolean', 'array'].forEach(type => {
    if (MType[type]) {
        MSchema[type] = function () {
            return new MType[type]()
        }
    }
});
export default MSchema;