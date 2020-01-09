
import TopoBlock from './block';
import TopoElement from './element';

interface TopoGroup extends TopoBlock{
  children: TopoElement[];
  backgroundImage: string;
  
  add: (element: TopoElement) => void;
  remove: (element: TopoElement) => void;
  clear: (element: TopoElement) => void;
}

export default TopoGroup;