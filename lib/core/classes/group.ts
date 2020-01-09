import TopoBlock from './block';
import ITopoGroup from '../interfaces/group';
import TopoElement from './element';

class TopoGroup extends TopoBlock implements ITopoGroup {
  elements: TopoElement[];

  constructor () {
    super();
    this.type = 'TopoGroup';
    this.elements = [];
  }

  render (ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation / 180 * Math.PI);
    ctx.scale(this.scale, this.scale);
    this.elements.forEach(el => el.render(ctx));
    ctx.restore();
  }

  contain (x: number, y: number):boolean {
    let { x: _x, y: _y, width: w, height: h } = this;

    return x >= _x && x <= _x + w && y >= _y && y <= _y + h;
  }

  add (element:TopoElement) {
    if (this.elements.includes(element)) return;
    element.parent = this;
    element.root = this.root || this;
    this.elements.push(element);
  }

  remove (element: TopoElement) {
    let i = this.elements.indexOf(element);
    if (i > -1) {
      this.elements.splice(i, 1);
      element.parent = null;
      element.root = null;
    }
  }

  clear () {
    this.elements.forEach(elem => {
      elem.parent = null;
      elem.root = null;
    })
    this.elements = [];
  }
}

export default TopoGroup;