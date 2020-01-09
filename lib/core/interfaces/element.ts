interface TopoElement {
  id: string;
  type: string;
  root: TopoElement;
  parent: TopoElement;
  
  text: string;
  textPosition: string;
  fontSize: number;
  textColor: string;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  opacity: number;
  visible: boolean;
  
  render: (ctx?: CanvasRenderingContext2D) => void;
  contain: (x: number, y: number) => boolean;
  show: () => void;
  hide: () => void;
}

export default TopoElement;