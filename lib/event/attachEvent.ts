
import TopoView from "../core/classes/view";
import TopoEvent from '../event/TopoEvent';
import TopoEventTarget from "./TopoEventTarget";
import TopoElement from "../core/classes/element";
import TopoGroup from "../core/classes/group";

function attachEvent (view:TopoView) {
  const canvas = view.canvas;

  const trigger = function (eventName: string, path:TopoEventTarget[], originalEvent:MouseEvent) {
    const e:TopoEvent = new TopoEvent(eventName, originalEvent.offsetX, originalEvent.offsetY);
    e.target = path[path.length - 1];
    e.path = path;
    e.originalEvent = originalEvent;
    e.trigger();
  }

  let mousemoveFlag:boolean;
  let mousedownFlag:boolean;
  let path:TopoEventTarget[] = [];
  let clickFlag:number;

  const refreshEventTarget = function (e: MouseEvent) {
    const collide = function (el:TopoElement|TopoGroup, x: number, y: number) {
      if (el.contain(x, y)) path.push(el);

      if (el instanceof TopoGroup) {
        let coord = el.getRelativeCoord(x, y);
        el.elements.forEach(child => collide(child, coord.x, coord.y))
      }
    }

    path = [];
    collide(view, e.offsetX, e.offsetY);
  }

  /**
   * 事件处理函数
   */
  const eventHandlers = {
    contextmenu (e: MouseEvent) {
      e.preventDefault();
    },
    mousedown (e: MouseEvent) {
      mousedownFlag = true;
      mousemoveFlag = false;

      trigger('mousedown', path, e);
    },
    mousemove (e: MouseEvent) {
      if (mousedownFlag) {
        if (!mousemoveFlag) {
          trigger('dragstart', path, e);
          mousemoveFlag = true;
        }
        else {
          trigger('drag', path, e);
        }
      } else {
        let prevEventTarget:TopoEventTarget = path[path.length - 1] || null;
        // 重新计算当前的事件对象
        refreshEventTarget(e);
        let currentEventTarget:TopoEventTarget = path[path.length - 1] || null;
        
        if (prevEventTarget === currentEventTarget) {
          trigger('mousemove', path, e);
        }
        else {
          trigger('mouseenter', [currentEventTarget], e);
          trigger('mouseleave', [prevEventTarget], e);
        }
      }
    },
    mouseup (e: MouseEvent) {
      if (mousemoveFlag) {
        trigger('dragend', path, e);
      }
      else {
        if (e.button === 0) {
          if (clickFlag === 0) {
            setTimeout(() => {
              if (clickFlag === 2) {
                trigger('dblclick', path, e);
                clickFlag = 0;
              }
            }, 300)
          }
          trigger('click', path, e);
          clickFlag++;
        }
        else if (e.button === 2) {
          trigger('contextmenu', path, e);
        }
      }
      trigger('mouseup', path, e);

      mousemoveFlag = false;
      mousedownFlag = false;
    },
    mouseenter (e: MouseEvent) {
      trigger('mouseenter', path, e);
    },
    mouseleave (e: MouseEvent) {
      mousemoveFlag = false;
      mousedownFlag = false;
      trigger('mouseleave', path, e);
    },
    mousewheel (e: MouseWheelEvent) {
      e.preventDefault();
      trigger('mousewheel', path, e);
    },
    DOMMouseScroll (e: MouseEvent) {
      e.preventDefault();
      trigger('mousewheel', path, e);
    }
  }

  for (let eventName in eventHandlers) {
    canvas.addEventListener(eventName, eventHandlers[eventName]);
  }
}

export default attachEvent;
