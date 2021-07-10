const al = require('../')(__dirname + '/autoload');
console.log(al);

//
// Test if the Point class is loaded properly.
//
describe('Class Loader', () => {
    test('loaded Point class', () => {
        expect(typeof(al.Point)).toBe('function');
        expect(al.Point.name).toBe('Point');
    });
    test('magSq function works', () => {
        let pt = new al.Point(2, 2);
        expect(pt.magSq()).toBe(8);
    });
});
//
// Test if the AddUtil and SubUtil class loaded properly.
//
describe('Multi-Class Loader', () => {
    test('loaded AddUtil class', () => {
        expect(typeof(al.AddUtil)).toBe('function');
        expect(al.AddUtil.name).toBe('AddUtil');
    });
    test('add function works', () => {
        expect(al.AddUtil.add(3, 4)).toBe(7);
    });
    
    test('loaded SubUtil class', () => {
        expect(typeof(al.SubUtil)).toBe('function');
        expect(al.SubUtil.name).toBe('SubUtil');
    });
    test('sub function works', () => {
        expect(al.SubUtil.sub(5, 2)).toBe(3);
    });
});