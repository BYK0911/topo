import attachEvent from '../../event/attachEvent';

import TopoNodeElement from "./TopoNodeElement";
import TopoEventTarget from "../../event/TopoEventTarget";
import TopoEdgeElement from "./TopoEdgeElement";

let id:number = 0;

class TopoView extends TopoEventTarget {
  id:string;
  nodes:TopoNodeElement[];
  edges:TopoEdgeElement[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  backgroundColor: string;

  constructor () {
    super();
    this.id = 'TopoView_' + id++;
    this.nodes = [];
    this.edges = [];
    this.offsetX = 0;
    this.offsetY = 0;
    this.width = 500;
    this.height = 400;
    this.backgroundColor = '#f0f0f0';
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 400;
    this.canvas.style.width = 500 + 'px';
    this.canvas.style.height = 400 + 'px';
    this.canvas.style.verticalAlign = 'middle';

    attachEvent(this);
  }

  render ():void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.edges.forEach(edge => {
      if (edge.visible) edge.render(this.ctx)
    });
    this.nodes.forEach(n => {
      if (n.visible) n.render(this.ctx)
    });
  }

  resize (width: number, height: number):void {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
  }

  addNode (node:TopoNodeElement):void {
    if (this.nodes.includes(node)) return;
    this.nodes.push(node);
  }

  addEdge (edge:TopoEdgeElement):void{
    if(this.edges.includes(edge)) return;
    this.edges.push(edge);
  }
}

export default TopoView;