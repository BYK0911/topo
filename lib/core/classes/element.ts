import TopoEventTarget from '../../event/TopoEventTarget';
import ITopoElement from '../interfaces/element';
import TopoGroup from '../interfaces/group';

let id: number = 0;
class TopoElement extends TopoEventTarget implements ITopoElement {
  id: string;
  visible: boolean;
  type: string;
  root: ITopoElement;
  parent: TopoGroup;
  
  constructor () {
    super();
    this.id = 'TopoElement_' + id++;
    this.type = 'TopoElement';
    this.root = null;
    this.parent = null;
    this.visible = true;
  }

  render (ctx?: CanvasRenderingContext2D) {

  }

  contain (x: number, y:number) :boolean {
    return false;
  }

  show () {
    this.visible = true;
  }

  hide () {
    this.visible = false;
  }
}

export default TopoElement;