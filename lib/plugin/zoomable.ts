import TopoBlock from "../core/classes/block";

function zoomable(el: TopoBlock) {
  el.on('mousewheel', function (event) {
    event.preventDefault();
    let e = event.originalEvent;
    let delta = e.deltaY|| e.detail;
    let s: number = el.scale;
    let x: number = e.x
    let y: number = e.y
    let dx: number;
    let dy: number;
    let k: number;

    if (el.parent) {
      let coord = el.parent.getRelativeCoord(x, y);
      x = coord.x;
      y = coord.y;
    }

    
    el.zoom(delta < 0);
    k = el.scale / s;
    
    dx = x - el.x;
    dy = y - el.y;

    dx = x - dx * k - el.x;
    dy = y - dy * k - el.y;
  
    el.translate(dx, dy);
  })
}

export default zoomable;