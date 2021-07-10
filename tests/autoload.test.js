const obj = require('../')(__dirname + '/autoload');
console.log(obj);

describe('Point Class', () => {
    test('loaded', () => {
        expect(typeof(obj.Point)).toBe('function');
    });
    test('magSq function', () => {
        let pt = new obj.Point(2, 2);
        expect(pt.magSq()).toBe(8);
    });
});