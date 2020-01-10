import TopoBlock from './block';
import ITopoGroup from '../interfaces/group';
import TopoElement from './element';
import TopoView from './view';

class TopoGroup extends TopoBlock implements ITopoGroup {
  protected elements: TopoElement[];
  readonly type: string = 'TopoGroup';
  backgroundImage: string = '';
  borderColor: string = '#ddd';

  get children (): TopoElement[] {
    return this.elements;
  } 
  constructor () {
    super();
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
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
    if (this instanceof TopoView) {
      element.root = this.root || this;
    } else {
      element.root = this.root;
    }
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
    this.elements.splice(0, this.elements.length);
  }
}

export default TopoGroup;