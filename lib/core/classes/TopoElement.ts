import TopoEventTarget from '../../event/TopoEventTarget';

let id: number = 0;
class TopoElement extends TopoEventTarget {
  id: string;
  visible: boolean;
  
  constructor () {
    super();
    this.id = 'TopoElement_' + id++;
    this.visible = true;
  }
}

export default TopoElement;