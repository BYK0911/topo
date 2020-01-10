
const vector = {
  add (...vs: number[][]): number[] {
    var res = []
    vs.forEach(v => {
      v.forEach((d, i) => {
        res[i] = res[i] ? res[i] + d : d
      })
    })
    return res;
  },

  deduct (v1: number[], v2: number[]): number[] {
    let v = [...v1];
    v2.forEach((d, i) => {
      v[i] = (v[i] || 0) - d;
    })

    return v;
  },

  norm (v: number[]): number {
    if (v.length === 0) return;
    return Math.pow(v.reduce((res, n) => res + n * n, 0), 1 / v.length);
  },

  dot (v1: number[], v2: number[]): number {
    let len = Math.min(v1.length, v2.length),
      res = 0,
      i = -1;
    
    while (++i < len) {
      res += v1[i] * v2[i]
    }
    
    return res;
  },

  cross (v1: number[], v2: number[]): number {
    return v1[0] * v2[1] - v1[1] * v2[0];
  },

  crossNorm (v1: number[], v2: number[]): number {
    return Math.abs(v1[0] * v2[1] - v1[1] * v2[0]);
  },

  multiply (v: number[], n: number): number[] {
    return v.map(d => d * n);
  },

  cos (v1: number[], v2: number[]): number {
    return this.dot(v1, v2) / this.norm(v1) / this.norm(v2);
  },

  angle (v1: number[], v2: number[]): number {
    return Math.acos(this.cos(v1, v2));
  }
}

export default vector;