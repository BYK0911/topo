
const ctx = document.createElement('canvas').getContext('2d');

function isPointOnCurve (x1: number, y1: number, cpx1: number, cpy1: number, cpx2: number, cpy2: number, x2: number, y2: number, x: number, y: number): boolean {
  let isOn: boolean;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
  isOn = ctx.isPointInStroke(x, y);
  ctx.closePath();
  
  return isOn; 
}

export default isPointOnCurve;