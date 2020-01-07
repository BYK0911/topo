import TopoEventTarget from './TopoEventTarget';
import EventUtil from './EventUtil';

class TopoEvent {
  type:string;
  x:number;
  y:number;
  target:TopoEventTarget|null;
  path:TopoEventTarget[];
  originalEvent;
  private _preventDefault: boolean;
  private _stopPropergation: boolean;

  constructor (eventName: string, x: number, y: number) {
    this.type = eventName;
    this.x = x;
    this.y = y;
    this._preventDefault = false;
    this._stopPropergation = false;
    this.target = null;
    this.path = [];
    this.originalEvent = null;
  }

  stopPropergation ():void {
    this._stopPropergation = true;
  }

  preventDefault ():void {
    this._preventDefault = true;
  }

  trigger ():void {
    let i = this.path.length;
    let target:TopoEventTarget;
    let handlers;

    while (--i > -1) {
      target = this.path[i];
      handlers = EventUtil.match(target, this.type);

      if (handlers) {
        handlers.forEach(h => h.call(target, this));
      }
      
      if (this._stopPropergation) {
        break;
      }
    }
  }
}

export default TopoEvent;