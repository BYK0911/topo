import TopoEdge from './edge';
import isPointOnLine from '../../util/isPointOnLine';

class TopoSEdge extends TopoEdge {
  readonly type: string = 'TopoSEdge';
  constructor () {
    super();
  }

  render (ctx: CanvasRenderingContext2D):void {
    let [{ x: x1, y: y1 }, { x: x2, y: y2}] = this.points.map(p => this.getCoord(p));
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, (y1 + y2) / 2);
    ctx.lineTo(x2, (y1 + y2) / 2);
    ctx.lineTo(x2, y2);
    ctx.setLineDash(this.lineDash);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  contain (x: number, y: number):boolean {
    let { x: x1, y: y1 } = this.getCoord(this.points[0]);
    let { x: x2, y: y2 } = this.getCoord(this.points[1]);
    let yc = (y1 + y2) / 2;
    let ps = [[x1, y1], [x1, yc], [x2, yc], [x2, y2]];
    let i = -1;

    while (++i < 3) {
      if (isPointOnLine(ps[i][0], ps[i][1], ps[i + 1][0], ps[i + 1][1], x, y)) return true
    }

    return false;
  }
}

export default TopoSEdge;