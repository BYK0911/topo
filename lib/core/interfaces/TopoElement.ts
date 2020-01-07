interface TopoElement {
  id: string;
  visible: boolean;
  render: (ctx: CanvasRenderingContext2D)=> void;
  contain: (x: number, y: number) => boolean;
  show: () => void;
  hide: () => void;
}

export default TopoElement;