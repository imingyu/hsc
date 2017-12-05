var defaultHandler = {
    'any': val => {
    },
    'string': (val, trim) => {
        var type = typeof val;
        if (type === 'number' && isNaN(val)) {
            return false;
        }
        if (type === 'object') {
            if (type === null || !val.toString) {
                return false;
            }
        }
        if (type === 'string') {
            if (!val) {
                return false;
            }
            if (trim && val.trim() === '') {
                return false;
            }
        }
        return true;
    }
}
export default (val, type, trim, handler) => {
    if (typeof val === 'undefined') {
        return false;
    }
    return handler ? handler(val, type, trim, defaultHandler[type]) : defaultHandler[type](val, type, trim)
}