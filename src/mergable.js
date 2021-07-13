/**
 * Determains if the object is mergable.
 * @param {*} obj 
 * @returns {boolean}
 */
 function mergable(obj) {
    if (typeof(obj) === 'object' && obj !== null && obj.constructor.name === 'Object') {
        for (key of Object.keys(obj)) {
            const val = obj[key];
            if (typeof(val) === 'function' || mergable(val)) {
                return true;
            }
        }
    }
    return false;
}
module.exports = mergable;