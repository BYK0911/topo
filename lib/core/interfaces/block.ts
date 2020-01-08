
import TopoElement from './element';
import Coord from './coord';

interface TopoBlockElement extends TopoElement{
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;

  translate: (x: number, y: number) => void;
  rotate: (angle: number) => void;
  getRelativeCoord: (x: number, y: number) => Coord;
  getAbsoluteCoord: (x: number, y: number) => Coord;
  zoom: (isZoomIn: boolean) => void;
}

export default TopoBlockElement;