import vector from './vector';

function isPointOnLine (x1: number, y1: number, x2: number, y2: number, x: number, y: number): boolean {
  const r = 2; // 容差

  let v1 = [x2 - x1, y2 - y1], v = [x - x1, y - y1],
    n1 = vector.norm(v1), n = vector.norm(v),
    d = vector.dot(v1, v),
    c = vector.crossNorm(v1, v);

  if (n <= r) return true;
  if (d / n1 > -r && d / n1 <= n1 + r && c / n1 <= r) return true;

  return false; 
}

export default isPointOnLine;