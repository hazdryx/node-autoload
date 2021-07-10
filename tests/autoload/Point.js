class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    magSq() {
        return this.x * this.x + this.y * this.y;
    }
}
module.exports = Point;