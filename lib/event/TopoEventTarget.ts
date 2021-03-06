import TopoEvent from './TopoEvent';

const eventHandlers = new WeakMap();

const EventUtil = {
  has (target:TopoEventTarget, eventName: string, eventHandler: Function):boolean {
    let boo = eventHandlers.has(target);
    let handlers;

    if (boo) {
      handlers = eventHandlers.get(target)[eventName];
      boo = handlers && handlers.includes(eventHandler);
    }

    return boo;
  },

  add (target:TopoEventTarget, eventName: string, eventHandler: Function):void {
    let handlerMap;

    if (eventHandlers.has(target)) {
      handlerMap = eventHandlers.get(target);
    } else {
      handlerMap = {};
      eventHandlers.set(target, handlerMap);
    }

    handlerMap[eventName] = handlerMap[eventName] || [];
    handlerMap[eventName].push(eventHandler);
  },

  remove (target:TopoEventTarget, eventName?:string, eventHandler?:Function):void {
    if (!eventName) {
      eventHandlers.delete(target);
    } else if (!eventHandler) {
      eventHandlers.get(target)[eventName] = [];
    } else {
      let handlers = eventHandlers.get(target)[eventName];
      let index = handlers.indexOf(eventHandler);
      
      if (index > -1) handlers.splice(index, 1);
    }
  },

  match (target: TopoEventTarget, eventName: string) {
    return eventHandlers.has(target) ? eventHandlers.get(target)[eventName] : null;
  }
}

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
    let handlers = EventUtil.match(this, event.type);

    if (handlers) {
      handlers.forEach(h => h.call(this, event));
    }
  }
}

export default TopoEventTarget;