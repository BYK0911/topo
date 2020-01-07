import TopoElement from './TopoElement';
import ITopoNodeElement from '../interfaces/TopoNodeElement';

class TopoNodeElement extends TopoElement implements ITopoNodeElement {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;

  constructor () {
    super();
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.rotation = 0;
  }

  render (ctx: CanvasRenderingContext2D):void {
    let { x, y, width, height } = this;
    x -= width / 2;
    y -= height / 2;
    ctx.fillStyle = '#fa5';
    ctx.fillRect(x, y, width, height);
  }

  contain (x: number, y: number):boolean {
    let { x: _x, y: _y, width: w, height: h } = this;
    
    _x -= w / 2;
    _y -= h / 2;

    return x >= _x && x <= _x + w && y >= _y && y <= _y + h;
  }

  show ():void {
    this.visible = true;
  }

  hide ():void {
    this.visible = false;
  }

  translate (x: number, y: number):void {
    this.x += x;
    this.y += y;
  }

  rotate (angle: number):void {
    this.rotation = (this.rotation + angle) % (Math.PI * 2);
  }
}

export default TopoNodeElement;