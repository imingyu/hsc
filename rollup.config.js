var resolve = require('rollup-plugin-node-resolve');
var babel = require('rollup-plugin-babel');
var json = require('rollup-plugin-json');
var commonJS = require('rollup-plugin-commonjs');

var path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    dest: path.resolve(__dirname, './dist/index.js'),
    format: 'umd',
    moduleName: 'mschema',
    sourceMap: true,
    plugins: [
        json(),
        resolve(),
        babel(),
        commonJS()
    ]
};