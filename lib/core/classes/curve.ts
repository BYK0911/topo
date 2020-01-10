import TopoEdge from './edge';
import isPointOnCurve from '../../util/isPointOnCurve';

class TopoCurve extends TopoEdge {
  readonly type: string = 'TopoCurve';
  constructor () {
    super();
  }

  render (ctx: CanvasRenderingContext2D):void {
    let [{ x: x1, y: y1 }, { x: cx1, y: cy1 }, { x: cx2, y: cy2 }, { x: x2, y: y2}] = this.points.map(p => this.getCoord(p));
    
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);

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
    let [{ x: x1, y: y1 }, { x: cx1, y: cy1 }, { x: cx2, y: cy2 }, { x: x2, y: y2}] = this.points.map(p => this.getCoord(p));
    
    return isPointOnCurve(x1, y1, cx1, cy1, cx2, cy2, x2, y2, x, y);
  }
}

export default TopoCurve;