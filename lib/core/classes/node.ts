import TopoBlock from './block';

class TopoNode extends TopoBlock {
  constructor () {
    super();
    this.type = 'TopoNode';
    this.width = 50;
    this.height = 50;
  }

  render (ctx: CanvasRenderingContext2D):void {
    let { x, y, width, height } = this;
    x -= width / 2;
    y -= height / 2;
    ctx.fillStyle = '#fa5';
    ctx.fillRect(x, y, width, height);
  }
}

export default TopoNode;