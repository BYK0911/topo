import Coord from './coord';
import TopoElement from './element';

interface TopoLine extends TopoElement{
  points: Coord[];
  lineWidth: number;
  color: string;
  lineDash: number[];
}

export default TopoLine;