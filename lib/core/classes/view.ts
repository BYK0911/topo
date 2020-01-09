import attachEvent from '../../event/attachEvent';
import TopoGroup from './group';

class TopoView extends TopoGroup {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  backgroundColor: string;
  readonly type: string = 'TopoView';

  constructor () {
    super();
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
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation / 180 * Math.PI)
    this.ctx.scale(this.scale, this.scale);
    this.children.forEach(elem => {
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

  contain (x: number, y: number) :boolean {
    return true;
  }
}

export default TopoView;