/**
 * Test if the Point class is loaded properly.
 */
function testClassLoader(al) {
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
}
/**
 * Test if the AddUtil and SubUtil class loaded properly.
 */
function testMultiClassLoader(al) {
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
}
/**
 * Tests Point3 class.
 */
function testPoint3(al, desc) {
    describe(desc, () => {
        test('loaded Point3 class', () => {
            expect(typeof(al.Point3)).toBe('function');
            expect(al.Point3.name).toBe('Point3');
        });
        test('magSq function works', () => {
            let pt = new al.Point3(2, 3, 4);
            expect(pt.magSq()).toBe(29);
        });
    });
}

// 
// TESTING STARTS HERE
//
describe('Testing defaults', () => {
    const al = require('../')(__dirname + '/autoload');
    console.log(al);

    testClassLoader(al);
    testMultiClassLoader(al);
    testPoint3(al.threeD, 'Namespacing & Recursion');
});

//
// No recursion
//
describe('Testing no recursion', () => {
    const al = require('../')(__dirname + '/autoload', {
        recursive: false
    });
    console.log(al);

    testClassLoader(al);
    testMultiClassLoader(al);

    test('threeD should not load', () => {
        expect(al.threeD).toBe(undefined);
    });
});

//
// No namespacing
//
describe('Testing no namespacing', () => {
    const al = require('../')(__dirname + '/autoload', {
        namespacing: false
    });
    console.log(al);

    testClassLoader(al);
    testMultiClassLoader(al);
    testPoint3(al, 'Point3 at top-level');
});