import TopoElement from './element';
import TopoLine from '../interfaces/line';
import Coord from '../interfaces/coord';
import isPointOnLine from '../../util/isPointOnLine';
import TopoBlock from './block';

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
    ctx.save();
    ctx.beginPath();
    this.points.forEach((p, i) => {
      let { x, y } = this.getCoord(p);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    })
    ctx.globalAlpha = this.opacity;
    if (this.shadowBlur) {
      ctx.shadowBlur = this.shadowBlur;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;
      ctx.shadowColor = this.shadowColor;
    }

    ctx.setLineDash(this.lineDash);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  contain (x: number, y: number):boolean {
    let i = -1;
    let len = this.points.length - 1;

    while (++i < len) {
      let { x: x0, y: y0 } = this.getCoord(this.points[i]);
      let { x: x1, y: y1 } = this.getCoord(this.points[i + 1]);
      if (isPointOnLine(x0, y0, x1, y1, x, y)) return true
    }

    return false;
  }

  protected getCoord (p: {x: number, y: number}) {
    if (p instanceof TopoBlock) {
      return p.resolveCoord(this.parent);
    } else {
      return p;
    }
  }
}

export default TopoEdge;