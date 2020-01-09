import TopoEventTarget from '../../event/TopoEventTarget';
import ITopoElement from '../interfaces/element';
import TopoGroup from './group';

let id: number = 0;
abstract class TopoElement extends TopoEventTarget {
  
  readonly id: string = 'TopoElement_' + (id++);
  readonly type: string;
  root: ITopoElement;
  parent: TopoGroup;
  text: string = '';
  textPosition: string = 'center-bottom';
  fontSize: number = 12;
  textColor: string = '#333';
  shadowColor: string = 'rgba(255, 255, 255, 0)';
  shadowOffsetX: number = 0;
  shadowOffsetY: number = 0;
  shadowBlur: number = 0;
  opacity: number = 1;
  visible: boolean = true;

  abstract render (ctx?: CanvasRenderingContext2D):void;

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