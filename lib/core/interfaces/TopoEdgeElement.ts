import Coord from './Coord';
import TopoElement from './TopoElement';

interface TopoNodeElement extends TopoElement{
  points: Coord[];
}

export default TopoNodeElement;