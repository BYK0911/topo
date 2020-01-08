interface TopoElement {
  id: string;
  visible: boolean;
  type: string;
  root: TopoElement;
  parent: TopoElement;
  
  render: (ctx?: CanvasRenderingContext2D) => void;
  contain: (x: number, y: number) => boolean;
  show: () => void;
  hide: () => void;
}

export default TopoElement;