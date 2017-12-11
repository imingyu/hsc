import MType from './mtypes/index.js';
import { version } from '../package.json';
const MSchema = {
    version
};
['any', 'string', 'number', 'object', 'boolean', 'array'].forEach(type => {
    MSchema[type] = function () {
        return new MType[type]()
    }
});
export default MSchema;