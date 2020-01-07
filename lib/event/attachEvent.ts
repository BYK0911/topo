
import TopoView from "../core/classes/TopoView";
import TopoEvent from '../event/TopoEvent';
import TopoEventTarget from "./TopoEventTarget";

function attachEvent (view:TopoView) {
  const canvas = view.canvas;
  const trigger = function (eventName: string, path:TopoEventTarget[], e) {
    const _e:TopoEvent = new TopoEvent(eventName, e.offsetX, e.offsetY);
    _e.target = path[path.length - 1];
    _e.path = path;
    _e.trigger();
  }

  const handlers = {
    mousemove (e) {
      const path:TopoEventTarget[] = [];

      view.edges.forEach(edge => {
        if (edge.visible && edge.contain(e.offsetX, e.offsetY)) {
          path.push(edge);
        }
      })
      view.nodes.forEach(n => {
        if (n.visible && n.contain(e.offsetX, e.offsetY)) {
          path.push(n);
        }
      })
      path.push(view);

      if (path.length) {
        trigger('mousemove', path, e);
      }
    }
  }

  canvas.addEventListener('mousemove', handlers.mousemove);
}

export default attachEvent;
