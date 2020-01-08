import vector from './vector';

function isPointOnLine (x1: number, y1: number, x2: number, y2: number, x: number, y: number): boolean {
  const r = 2; // 容差
  let v1 = [x2 - x1, y2 - y1],
    v2 = [x - x1, y - y1],
    n1 = vector.norm(v1),
    n2 = vector.norm(v2);

    if (n2 <= r) return true;
    if (n1 && vector.crossNorm(v1, v2) / n1 <= r) return true;

    return false; 
}

export default isPointOnLine;