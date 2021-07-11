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
 * Test if a json file was loaded correctly. 
 */
function testJsonLoader(al) {
    describe('JSON Loader', () => {
        test('loaded config', () => {
            expect(typeof(al.config)).toBe('object');
        });
        test('loaded correct values', () => {
            expect(al.config.hello).toBe('world');
        });
    });
}
/**
 * Tests Point3 class.
 */
function testNamespacing(al, desc = 'Namespacing') {
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
/**
 * Test NotLoaded.cjs is not loaded.
 */
function testNotLoaded(al) {
    test('.cjs aren\'t loaded by default', () => {
        expect(al.NotLoaded).toBeUndefined();
    })
}

// 
// TESTING STARTS HERE
//
describe('Testing defaults', () => {
    const al = require('../')(__dirname + '/autoload');

    testClassLoader(al);
    testMultiClassLoader(al);
    testJsonLoader(al);
    testNamespacing(al.threeD);
    testNotLoaded(al);
});

//
// No recursion
//
describe('Testing no recursion', () => {
    const al = require('../')(__dirname + '/autoload', {
        recursive: false
    });

    testClassLoader(al);
    testMultiClassLoader(al);
    testJsonLoader(al);
    testNotLoaded(al);

    test('threeD should not load', () => {
        expect(al.threeD).toBeUndefined();
    });
});

//
// No namespacing
//
describe('Testing no namespacing', () => {
    const al = require('../')(__dirname + '/autoload', {
        namespacing: false
    });

    testClassLoader(al);
    testMultiClassLoader(al);
    testJsonLoader(al);
    testNamespacing(al);
    testNotLoaded(al);
});

//
// .cjs files added to filter
//
describe('Testing .cjs in filter', () => {
    const al = require('../')(__dirname + '/autoload', {
        filter: /\.js$|\.cjs$|\.json$/
    });

    testClassLoader(al);
    testMultiClassLoader(al);
    testJsonLoader(al);
    testNamespacing(al.threeD);

    describe('.cjs Was Loaded', () => {
        test('NotLoaded was Loaded', () => {
            expect(typeof(al.NotLoaded)).toBe('function');
            expect(al.NotLoaded.name).toBe('');
        });
        test('NotLoaded.test() works', () => {
            expect(al.NotLoaded()).toBe(42);
        });
    });
});