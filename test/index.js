var mschema = require('../dist/index.js');
var assert = require('chai').assert;

describe('Types', () => {
    describe('Any', () => {
        describe('rule:Required', () => {
            const Any = mschema.any().required();
            it('"" is not required', () => {
                const result = Any.validate('');
                console.log(result)
                assert.isFalse(result.valid);
            })
        })
    })
})