import attachEvent from '../../event/attachEvent';
import TopoGroup from './group';
import Coord from '../../util/coord';

class TopoView extends TopoGroup {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  backgroundColor: string;

  constructor () {
    super();
    this.type = 'TopoView';
    this.scale = 1;
    this.width = 500;
    this.height = 400;
    this.backgroundColor = '#f0f0f0';
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 400;
    this.canvas.style.width = 500 + 'px';
    this.canvas.style.height = 400 + 'px';
    this.canvas.style.verticalAlign = 'middle';

    attachEvent(this);
  }

  render ():void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);
    this.ctx.translate(this.x, this.y);
    this.elements.forEach(elem => {
      if (elem.visible) elem.render(this.ctx)
    });
    this.ctx.restore();
  }

  resize (width: number, height: number):void {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
  }

  getRelativeCoord (x:number = 0, y:number = 0) {
    let coord = new Coord(x, y);

    coord.scale(1 / this.scale, 1 / this.scale);
    coord.translate(-this.x, -this.y);
    coord.rotate(-this.rotation);

    return coord;
  }

  getAbsoluteCoord (x:number = 0, y:number = 0) {
    let coord = new Coord(x, y);
    
    coord.rotate(this.rotation);
    coord.translate(this.x, this.y);
    coord.scale(this.scale, this.scale);

    return coord;
  }

  contain (x: number, y: number) :boolean {
    return true;
  }
}

export default TopoView;