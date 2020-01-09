import TopoBlock from './block';

class TopoNode extends TopoBlock {
  readonly type: string = 'TopoNode';
  constructor () {
    super();
    this.width = 50;
    this.height = 50;
  }

  render (ctx: CanvasRenderingContext2D):void {
    let {x, y, width, height } = this;
    x -= width / 2;
    y -= height / 2;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation / 180 * Math.PI)
    ctx.scale(this.scale, this.scale);
    ctx.fillStyle = '#fa5';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
  
  contain (x: number, y: number):boolean {
    let { width: w, height: h } = this;

    return x >= -w / 2 && x <= w / 2 && y >= -h / 2 && y <= h / 2;
  }
}

export default TopoNode;