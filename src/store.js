const STORE = {};
export var getItem = (key) => {
    return STORE[key];
}
export var setItem = (key, value) => {
    STORE[key] = value;
}