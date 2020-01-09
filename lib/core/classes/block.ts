import TopoElement from './element';
import Coord from '../../util/coord';

abstract class TopoBlock extends TopoElement {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  
  backgroundColor: string = 'rgba(255, 255, 255, 0)';
  borderWidth: number = 1;
  borderColor: string = 'rgba(255, 255, 255, 0)';

  protected constructor () {
    super();
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.rotation = 0;
    this.scale = 1;
  }

  contain (x: number, y: number):boolean {
    let { width: w, height: h } = this;

    return x >= 0 && x <= w && y >= 0 && y <= h;
  }

  translate (dx: number, dy: number):void {
    this.x += dx;
    this.y += dy;
  }

  rotate (angle: number):void {
    this.rotation = (this.rotation + angle) % 360;
  }

  zoom (isZoomIn: boolean) {
    this.scale *= isZoomIn ? 1.1 : 1 / 1.1;
  }

  getRelativeCoord (x:number = 0, y:number = 0) {
    let coord = new Coord(x, y);

    coord.translate(-this.x, -this.y);
    coord.scale(1 / this.scale, 1 / this.scale);
    coord.rotate(-this.rotation);

    return coord;
  }

  getAbsoluteCoord (x:number = 0, y:number = 0) {
    let coord = new Coord(x, y);
    
    coord.rotate(this.rotation);
    coord.scale(this.scale, this.scale);
    coord.translate(this.x, this.y);

    return coord;
  }
}

export default TopoBlock;