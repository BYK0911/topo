
import TopoElement from './TopoElement';

interface TopoNodeElement extends TopoElement{
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;

  translate: (x: number, y: number) => void;
  rotate: (angle: number) => void;
}

export default TopoNodeElement;