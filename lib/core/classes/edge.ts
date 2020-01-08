import TopoElement from './element';
import TopoLine from '../interfaces/line';
import Coord from '../interfaces/coord';

class TopoEdge extends TopoElement implements TopoLine {
  points: Coord[];
  lineDash: [0];
  lineWidth: number;
  color: string;

  constructor () {
    super();
    this.type = 'TopoEdge';
    this.points = [];
    this.lineDash = [0];
    this.lineWidth = 1;
    this.color = '#666';
  }

  render (ctx: CanvasRenderingContext2D):void {
    if (this.points.length < 2) return;

    ctx.beginPath();
    this.points.forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    })
    ctx.setLineDash(this.lineDash);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  contain (x: number, y: number):boolean {
    if (this.points.length < 2) return false;
    let { x: x1, y: y1 } = this.points[0];
    let { x: x2, y: y2 } = this.points[this.points.length - 1];

    x1 -= x;
    y1 -= y;
    x2 -= x;
    y2 -= y;

    return x1 * y2 - x2 * y1 === 0;
  }
}

export default TopoEdge;