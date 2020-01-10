import ITopoBlock from '../interfaces/block';
import TopoBlock from './block';

class TopoNode extends TopoBlock implements ITopoBlock{
  readonly type: string = 'TopoNode';

  icon: string = '';
  backgroundColor: string = '#fa5';
  width: number = 50;
  height: number = 50;

  constructor () { super() }

  render (ctx: CanvasRenderingContext2D):void {
    let {
      x, y, width, height,
      shadowOffsetX, shadowOffsetY, shadowColor, shadowBlur,
      borderWidth, borderColor,
      backgroundColor, opacity
    } = this;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation / 180 * Math.PI)
    ctx.translate(-width / 2, -height / 2);
    ctx.scale(this.scale, this.scale);

    ctx.globalAlpha = opacity;
    
    if (borderWidth) {
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(0, 0, width, height);
    }

    if (shadowBlur) {
      ctx.shadowOffsetX = shadowOffsetX;
      ctx.shadowOffsetY = shadowOffsetY;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
    }

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (this.text) {
      this.drawText(ctx);
    }

    ctx.restore();
  }
  
  contain (x: number, y: number):boolean {
    let { width: w, height: h } = this;

    return x >= -w / 2 && x <= w / 2 && y >= -h / 2 && y <= h / 2;
  }
}

export default TopoNode;