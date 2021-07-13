const mergable = require('../src/mergable');
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
    class A {
        constructor(x) {
            this.x = x;
        }
        double() {
            return 2 * this.x;
        }
    }

    runTest('empty object', { }, false);
    runTest('array', [], false);
    runTest('date', new Date(), false);
    runTest('functions', () => { }, false);
    runTest('classes', A, false);
    runTest('class instances', new A(1), false);
    runTest('objects /wo functions', { hello: "world" }, false);
});