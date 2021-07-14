const mergable = require('../src/mergable');
class A {
    constructor(x) {
        this.x = x;
    }
    double() {
        return 2 * this.x;
    }
}
/**
 * Runs a test function using mergable.
 * 
 * @param {string} description
 * @param {any} any 
 * @param {boolean} result
 * @return {CallableFunction} The test function. 
 */
function runTest(description, any, result) {
    test(description, () => {
        expect(mergable(any)).toBe(result);
    });
}

describe('Not Mergable', () => {
    runTest('empty object', { }, false);
    runTest('array', [], false);
    runTest('date', new Date(), false);
    runTest('functions', () => { }, false);
    runTest('classes', A, false);
    runTest('class instances', new A(1), false);
    runTest('objects /wo functions', { hello: "world" }, false);
    runTest('objects /w class instances', { a: new A(2) }, false);
});
describe('Mergable', () => {
    runTest('objects /w classes', { A: A }, true);
    runTest('objects /w functions', { runTest: runTest }, true);
    runTest('objects /w nested classes', { ns: { A: A }}, true);
    runTest('objects /w nested functions', { testing: { runTest: runTest }}, true);
    runTest('objects /w data and functions', { x: 5, runTest: runTest }, true);
    runTest('objects /w data and nested functions', { x: 5, testing: { runTest: runTest }}, true);
});