import topo from '../lib';

const view = topo.init();

document.body.style.margin = '0';
document.body.appendChild(view.canvas);

const n1 = new topo.TopoNode();
const n2 = new topo.TopoNode();
const edge = new topo.TopoEdge();
n1.translate(300, 100);
n2.translate(500, 200);
edge.points.push(n1, n2);
edge.color = '#5af';
view.add(edge);
view.add(n1);
view.add(n2);

view.resize(window.innerWidth, window.innerHeight);

(function animate () {
  window.requestAnimationFrame(animate)
  view.render();
}());

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
  
  let dx = (e.originalEvent.offsetX - prevX) / view.scale;
  let dy = (e.originalEvent.offsetY - prevY) / view.scale;
  e.target.translate(dx, dy);
  prevX = e.originalEvent.offsetX;
  prevY = e.originalEvent.offsetY;
})