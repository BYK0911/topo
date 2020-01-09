import TopoElement from './element';
import TopoLine from '../interfaces/line';
import Coord from '../interfaces/coord';
import isPointOnLine from '../../util/isPointOnLine';

class TopoEdge extends TopoElement implements TopoLine {
  points: Coord[];
  lineDash: [0];
  lineWidth: number;
  color: string;
  readonly type: string = 'TopoEdge';

  constructor () {
    super();
    this.points = [];
    this.lineDash = [0];
    this.lineWidth = 1;
    this.color = '#666';
  }

  render (ctx: CanvasRenderingContext2D):void {
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
    let { x: x1, y: y1 } = this.points[0];
    let { x: x2, y: y2 } = this.points[this.points.length - 1];

    return isPointOnLine(x1, y1, x2, y2, x, y);
  }
}

export default TopoEdge;