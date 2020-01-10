import TopoBlock from '../core/classes/block';
import TopoEvent from '../event/TopoEvent';

function draggable (el: TopoBlock ):void {
  let prevX: number;
  let prevY: number;

  el.on('mousedown', function (e) {
    e.stopPropagation();
    e.originalEvent.target.style.cursor = 'move';
  })

  el.on('dragstart', function (e) {
    e.stopPropagation();
    e.originalEvent.target.style.cursor = 'move';
    prevX = e.originalEvent.offsetX;
    prevY = e.originalEvent.offsetY;
  })
  
  el.on('drag', function (e: TopoEvent) {
    e.stopPropagation();
    let dx: number, dy: number;
    if (el.parent) {
      let { x: x0, y: y0 } = el.parent.getRelativeCoord(prevX, prevY);
      let { x: x1, y: y1 } = el.parent.getRelativeCoord(e.originalEvent.offsetX, e.originalEvent.offsetY);
      dx = x1 - x0;
      dy = y1 - y0;
    } else {
      dx = e.originalEvent.offsetX - prevX;
      dy = e.originalEvent.offsetY - prevY;
    }
    el.translate(dx, dy);
    prevX = e.originalEvent.offsetX;
    prevY = e.originalEvent.offsetY;
  })

  el.on('mouseup', function (e) {
    e.stopPropagation();
    e.originalEvent.target.style.cursor = 'default';
  })
}

export default draggable;