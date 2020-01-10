import TopoEdge from './edge';
import isPointOnLine from '../../util/isPointOnLine';

class TopoZEdge extends TopoEdge {
  readonly type: string = 'TopoZEdge';
  constructor () {
    super();
  }

  render (ctx: CanvasRenderingContext2D):void {
    let [{ x: x1, y: y1 }, { x: x2, y: y2}] = this.points.map(p => this.getCoord(p));
    
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo((x1 + x2) / 2, y1);
    ctx.lineTo((x1 + x2) / 2, y2);
    ctx.lineTo(x2, y2);

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
    let { x: x1, y: y1 } = this.getCoord(this.points[0]);
    let { x: x2, y: y2 } = this.getCoord(this.points[1]);
    let xc = (x1 + x2) / 2;
    let ps = [[x1, y1], [xc, y1], [xc, y2], [x2, y2]];
    let i = -1;

    while (++i < 3) {
      if (isPointOnLine(ps[i][0], ps[i][1], ps[i + 1][0], ps[i + 1][1], x, y)) return true
    }

    return false;
  }
}

export default TopoZEdge;