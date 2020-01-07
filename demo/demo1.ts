import topo from '../lib';

const view = topo.init();

document.body.style.margin = '0';
document.body.appendChild(view.canvas);

const n1 = new topo.TopoNodeElement();
const n2 = new topo.TopoNodeElement();
const edge = new topo.TopoEdgeElement();
n1.translate(300, 100);
n2.translate(500, 100);
edge.points.push(n1, n2);
view.addNode(n1);
view.addNode(n2);
view.addEdge(edge);

view.resize(window.innerWidth, window.innerHeight);
view.render();

n1.on('mousemove', function (e) {
  console.log(this);
})

edge.on('mousemove', function () {
  console.log(this);
})

console.log(view)