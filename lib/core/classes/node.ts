import TopoBlock from './block';

class TopoNode extends TopoBlock {
  constructor () {
    super();
    this.type = 'TopoNode';
    this.width = 50;
    this.height = 50;
  }

  render (ctx: CanvasRenderingContext2D):void {
    let {x, y, width, height } = this;
    x -= width / 2;
    y -= height / 2;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.rotation / 180 * Math.PI)
    ctx.fillStyle = '#fa5';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}

export default TopoNode;