module.exports = class Point3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    magSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
};