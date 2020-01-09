import TopoElement from '../core/classes/element';

class TopoEvent {
  type:string;
  x:number;
  y:number;
  target:TopoElement;
  path:TopoElement[];
  originalEvent: MouseEvent | WheelEvent;
  private _preventDefault: boolean;
  private _stopPropagation: boolean;

  constructor (eventName: string, x: number, y: number) {
    this.type = eventName;
    this.x = x;
    this.y = y;
    this._preventDefault = false;
    this._stopPropagation = false;
    this.target = null;
    this.path = [];
    this.originalEvent = null;
  }

  stopPropagation ():void {
    this._stopPropagation = true;
  }

  preventDefault ():void {
    this._preventDefault = true;
  }

  trigger ():void {
    let i = this.path.length;
    let target:TopoElement;

    while (--i > -1) {
      target = this.path[i];
      target.dispatch(this);
      
      if (this._stopPropagation) {
        break;
      }
    }
  }
}

export default TopoEvent;