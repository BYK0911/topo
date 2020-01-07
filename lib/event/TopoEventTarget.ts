import TopoEvent from './TopoEvent';
import EventUtil from './EventUtil';

/**
 * 拓扑事件对象类
 */
class TopoEventTarget {
  on (eventName: string, eventHandler):void {
    if (EventUtil.has(this, eventName, eventHandler)) return;
    EventUtil.add(this, eventName, eventHandler);
  }

  off (eventName?: string, eventHandler?: Function):void {
    EventUtil.remove(this, eventName, eventHandler);
  }

  dispatch (event: TopoEvent):void {
    event.target = this;
    event.path = [this];
    event.trigger();
  }
}

export default TopoEventTarget;