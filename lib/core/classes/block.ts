import TopoElement from './element';
import Coord from '../../util/coord';

abstract class TopoBlock extends TopoElement {
  [x: string]: any;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number = 0;
  scale: number = 1;
  
  backgroundColor: string = 'rgba(255, 255, 255, 0)';
  borderWidth: number = 1;
  borderColor: string = 'rgba(255, 255, 255, 0)';

  protected constructor () {
    super();
  }

  drawText (ctx: CanvasRenderingContext2D): void {
    let { width, height, text, textColor, textPosition, fontSize: fs } = this;
    let [align, vAlign] = textPosition.split('-');
    let p = 4;
    let x: number = align === 'left' ? -p : align === 'center' ? width / 2 : width + p;
    let y: number = vAlign === 'top' ? -p : vAlign === 'middle' ? height / 2 : height + p;
    
    ctx.textAlign = align === 'left' ? 'right' : align === 'center' ? 'center' : 'left';
    ctx.textBaseline = vAlign === 'top' ? 'bottom' : vAlign === 'middle' ? 'middle' : 'top';
    ctx.fillStyle = textColor;
    ctx.font = fs + 'px Sanserif';
    ctx.fillText(text, x, y)
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

  getRelativeCoord (x:number = 0, y:number = 0):Coord {
    let coord = new Coord(x, y);

    coord.translate(-this.x, -this.y);
    coord.scale(1 / this.scale, 1 / this.scale);
    coord.rotate(-this.rotation);

    return coord;
  }

  getAbsoluteCoord (x:number = 0, y:number = 0): Coord {
    let coord = new Coord(x, y);
    
    coord.rotate(this.rotation);
    coord.scale(this.scale, this.scale);
    coord.translate(this.x, this.y);

    return coord;
  }

  resolveCoord (el: TopoBlock, x: number = 0, y: number = 0) :Coord {
    let thatParents = [];
    let elParents = [];
    let coord = new Coord(x, y);
    let that: TopoBlock = this;
    let _el: TopoBlock = el;
    let index = -1;

    while (that) {
      thatParents.unshift(that);
      that = that.parent;
    }

    while (_el) {
      elParents.unshift(_el);
      _el = _el.parent;
    }
    for (let i = thatParents.length - 1; i >= 0; i--) {
      if ((index = elParents.indexOf(thatParents[i])) !== -1) {
        break;
      }
      coord = thatParents[i].getAbsoluteCoord(coord.x, coord.y);
    }

    for (let j = index + 1; j < elParents.length; j++) {
      coord = elParents[j].getRelativeCoord(x, y);
    }

    return coord;
  }
}

export default TopoBlock;