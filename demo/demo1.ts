import topo from '../lib';
import zoomable from '../lib/plugin/zoomable';
import draggable from '../lib/plugin/draggable'

const view = topo.init();
zoomable(view);
draggable(view);

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

const ri = (a:number = 300, b?: number) => {
  return Math.round(Math.random() * (b - a)) + a;
}
const w = window.innerWidth - 200;
const h = window.innerHeight - 200;

let nodes = [
  { type: 'TopoNode', id: '0', x: ri(100, w), y: ri(100, h), backgroundColor: '#a5f', text: 'Topo Node', width: 60, height: 60 },
  { type: 'TopoNode', id: '1', x: ri(100, w), y: ri(100, h), opacity: .5 },
  { type: 'TopoNode', id: '2', x: ri(100, w), y: ri(100, h), rotation: 45 },
  { type: 'TopoNode', id: '3', x: ri(100, w), y: ri(100, h), borderWidth: 1, borderColor: '#ddd' },
  { type: 'TopoNode', id: '4', x: ri(100, w), y: ri(100, h), shadowBlur: 6, shadowColor: '#666', shadowOffsetX: 3, shadowOffsetY: 5 },
  { type: 'TopoNode', id: '5', x: ri(100, w), y: ri(100, h), backgroundColor: '#5af' },
  { type: 'TopoNode', id: '6', x: ri(100, w), y: ri(100, h), backgroundColor: '#f5a' }
]
let edges = [
  { type: 'TopoEdge', points: ['1', '4'], lineWidth: 1, color: '#333', lineDash: [0] },
  { type: 'TopoZEdge', points: ['2', '5'], lineWidth: 1, color: '#333', lineDash: [5, 5] },
  { type: 'TopoSEdge', points: ['3', '6'], lineWidth: 1, color: '#fa5', lineDash: [0] }
]
function loadView(nodes:TopoNode[], edges:TopoEdge[]) {
  const ns = [], nmap = {};

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