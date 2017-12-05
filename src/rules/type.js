var defaultHandler = {
    'any': val => {
        return true;
    },
    'array': val => {
        return Array.isArray(val);
    }
}
['string', 'object', 'boolean', 'number'].forEach(item => {
    defaultHandler[item] = val => {
        return typeof val === item;
    }
})
export default (type) => {
    return (value) => {
        return defaultHandler[type](value);
    }
}