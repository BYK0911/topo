import topo from '../lib';
import zoomable from '../lib/plugin/zoomable';
import draggable from '../lib/plugin/draggable'

const view = topo.init();
zoomable(view);
draggable(view);
view.rotate(15);
view.translate(300, 0);

view.resize(window.innerWidth, window.innerHeight);

document.body.style.margin = '0';
document.body.appendChild(view.canvas);

function animate () {
  window.requestAnimationFrame(animate)
  view.render();
}

interface TopoNode {
  type: string;
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
interface TopoEdge {
  type: string;
  points: string[];
  lineWidth: number;
  color: string;
  lineDash: number[];
}

let nodes = [
  { type: 'TopoNode', id: '0', x: 100, y: 100 },
  { type: 'TopoNode', id: '1', x: 200, y: 100 },
  { type: 'TopoNode', id: '2', x: 300, y: 100 },
  { type: 'TopoNode', id: '3', x: 400, y: 100 },
  { type: 'TopoNode', id: '4', x: 300, y: 200 },
  { type: 'TopoNode', id: '5', x: 400, y: 200 },
  { type: 'TopoNode', id: '6', x: 500, y: 200 }
]
let edges = [
  { type: 'TopoEdge', points: ['1', '4'], lineWidth: 1, color: '#333', lineDash: [0] },
  { type: 'TopoZEdge', points: ['2', '5'], lineWidth: 1, color: '#333', lineDash: [5, 5] },
  { type: 'TopoSEdge', points: ['3', '6'], lineWidth: 1, color: '#fa5', lineDash: [0] }
]
function loadView(nodes:TopoNode[], edges:TopoEdge[]) {
  const ns = [], nmap = {}, es = [];

  nodes.forEach(n => {
    const node = new topo.TopoNode();
    draggable(node);
    Object.assign(node, n);

    ns.push(node);
    nmap[n.id] = node;
  })

  edges.forEach(e => {
    const edge = new topo[e.type]();
    edge.lineWidth = e.lineWidth;
    edge.lineDash = e.lineDash;
    edge.color = e.color;
    e.points.forEach(nid => {
      let n = {};
      Object.defineProperties(n, {
        x: { get: () => nmap[nid].getAbsoluteCoord().x },
        y: { get: () => nmap[nid].getAbsoluteCoord().y }
      })
      edge.points.push(n);
    })

    view.add(edge);
  })

  ns.forEach(n => view.add(n));
}

loadView(nodes, edges);

console.log(view);

animate();