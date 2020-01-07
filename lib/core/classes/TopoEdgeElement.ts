import TopoElement from './TopoElement';
import ITopoEdgeElement from '../interfaces/TopoEdgeElement';
import Coord from '../interfaces/Coord';

class TopoEdgeElement extends TopoElement implements ITopoEdgeElement {
  points: Coord[];

  constructor () {
    super();
    this.points = [];
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
    ctx.closePath();
    ctx.strokeStyle = '#5af';
    ctx.stroke();
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

  show ():void {
    this.visible = true;
  }

  hide ():void {
    this.visible = false;
  }
}

export default TopoEdgeElement;