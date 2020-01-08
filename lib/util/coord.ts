
export default class Coord{
  x: number;
  y: number;
  
  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  matrix (a: number, b: number, c: number, d: number, e: number, f: number) {
    // a, b, c   x
    // d, e, f   y
    // 0, 0, 1   1
    let x = this.x;
    let y = this.y;
    this.x = a * x + b * y + c;
    this.y = d * x + e * y + f;

    return this;
  }
  translate(dx: number, dy: number) {
    return this.matrix(1, 0, dx, 0, 1, dy);
  }
  scale (kx: number, ky: number) {
    return this.matrix(kx, 0, 0, 0, ky, 0);
  }
  rotate (angle: number) {
    angle = angle / 180 * Math.PI;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    return this.matrix(cos, -sin, 0, sin, cos, 0);
  }
  skewX (angle: number) {
    angle = angle / 180 * Math.PI;
    let tan = Math.tan(angle);
    return this.matrix(1, tan, 0, 0, 1, 0);
  }
  skewY (angle: number) {
    angle = angle / 180 * Math.PI;
    let tan = Math.tan(angle);
    return this.matrix(1, 0, 0, tan, 1, 0);
  }
}
