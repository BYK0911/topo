import topo from '../lib';

const view = topo.init();

document.body.style.margin = '0';
document.body.appendChild(view.canvas);

const n1 = new topo.TopoNode();
const n2 = new topo.TopoNode();
const edge = new topo.TopoZEdge();
n1.translate(300, 100);
n2.translate(400, 200);
edge.points.push(n1, n2);

const n3 = new topo.TopoNode();
const n4 = new topo.TopoNode();
const edge2 = new topo.TopoSEdge();
n3.translate(600, 100);
n4.translate(700, 200);
edge2.points.push(n3, n4);
edge2.color = '#5af';

const n5 = new topo.TopoNode();
const n6 = new topo.TopoNode();
const edge3 = new topo.TopoEdge();
n5.translate(900, 100);
n6.translate(1000, 200);
edge3.points.push(n5, n6);

view.add(edge);
view.add(edge2);
view.add(edge3);
view.add(n1);
view.add(n2);
view.add(n3);
view.add(n4);
view.add(n5);
view.add(n6);

view.resize(window.innerWidth, window.innerHeight);

(function animate () {
  window.requestAnimationFrame(animate)
  view.render();
}());

