import TopoNode from './core/classes/node';
import TopoEdge from './core/classes/edge';
import TopoZEdge from './core/classes/zEdge';
import TopoSEdge from './core/classes/sEdge';
import TopoView from './core/classes/view';

const topo = {
  TopoNode,
  TopoEdge,
  TopoZEdge,
  TopoSEdge,

  init () {
    const view:TopoView = new TopoView();

    let prevX = 0;
    let prevY = 0;

    view.on('mousewheel', e => {
      let _e = e.originalEvent, 
        delta = _e.wheelDelta || _e.detail,
        s = view.scale;

      view.zoom(delta > 0);

      view.translate(e.x / view.scale - e.x / s, e.y / view.scale - e.y / s)
    })

    view.on('dragstart', e => {
      e.stopPropergation();
      prevX = e.originalEvent.offsetX;
      prevY = e.originalEvent.offsetY;
    })
    view.on('drag', e => {
      e.stopPropergation();
      let { x: x0, y: y0 } = e.target.getRelativeCoord(prevX, prevY);
      let { x: x1, y: y1 } = e.target.getRelativeCoord(e.originalEvent.offsetX, e.originalEvent.offsetY);
      let dx = x1 - x0;
      let dy = y1 - y0;
      e.target.translate(dx, dy);
      prevX = e.originalEvent.offsetX;
      prevY = e.originalEvent.offsetY;
    })

    return view;
  }
};

export default topo;