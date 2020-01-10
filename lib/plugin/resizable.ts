import TopoBlock from '../core/classes/block';
import TopoGroup from '../core/classes/group';
import TopoView from '../core/classes/view';
import TopoEvent from '../event/TopoEvent';
import Coord from '../util/coord';
import vector from '../util/vector';

const resizeHandles = [
  [-1, -1, 'nw'], [0, -1, 'n'], [1, -1, 'ne'],
  [-1, 0, 'w'], [1, 0, 'e'],
  [-1, 1, 'sw'], [0, 1, 's'], [1, 1, 'se']
]

class TopoResizer extends TopoGroup{
  target: TopoBlock;

  constructor (el: TopoBlock) {
    super();
    this.target = el;

    resizeHandles.forEach((rh: [number, number, string]) => {
      let [ox, oy, dir] = rh;
      let resizeHandler = new TopoResizeHandler(ox, oy, dir);
      handleResize(resizeHandler);
      this.add(resizeHandler);
    })
    
    let rotateHandler = new TopoRotateHandler();
    handleRotate(rotateHandler);
    this.add(rotateHandler);
  }

  render (ctx: CanvasRenderingContext2D) {
    let { x, y, rotation, scale } = this.target;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation / 180 * Math.PI)
    ctx.scale(scale, scale);
    this.children.forEach(n => n.render(ctx));
    ctx.restore();
  }

  getRelativeCoord (x:number = 0, y:number = 0):Coord {
    return this.target.getRelativeCoord(x, y);
  }

  contain () {
    return false;
  }
}

class TopoResizeHandler extends TopoBlock {
  width: number = 6;
  height: number = 6;
  cursor: string;
  dir: string;
  get x () {
    return this.parent.target.width / 2 * this.ox;
  }

  get y () {
    return this.parent.target.height / 2 * this.oy;
  }

  constructor (ox: number, oy: number, dir: string) {
    super();
    this.ox = ox;
    this.oy = oy;
    this.dir = dir;
  }

  render (ctx: CanvasRenderingContext2D) {
    let { x, y, width, height } = this;
    x -= width / 2;
    y -= height / 2;
    ctx.save()
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.fillRect(x, y, this.width, this.height);
    ctx.strokeRect(x, y, this.width, this.height);
    ctx.restore();
  }

  contain (x: number, y: number):boolean {
    let { width: w, height: h } = this;

    return x >= -w / 2 && x <= w / 2 && y >= -h / 2 && y <= h / 2;
  }
}

class TopoRotateHandler extends TopoBlock {
  width: number = 6;
  height: number = 6;
  cursor: string;
  dir: string;
  get x () {
    return 0;
  }

  get y () {
    return -this.parent.target.height / 2 - 15;
  }

  constructor () {
    super();
  }

  render (ctx: CanvasRenderingContext2D) {
    let { x, y } = this;
    ctx.save()
    ctx.fillStyle = '#0af';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = '#0af';
    ctx.beginPath();
    ctx.arc(x, y, 8, Math.PI / 2, Math.PI * 2);
    ctx.lineTo(x + 8, y - 8)
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  contain (x: number, y: number):boolean {
    return x * x + y * y <= 64;
  }
}

function resizable (el: TopoBlock) {
  if (el instanceof TopoView) { throw Error('TopoView element resizement not supported')}

  el.resizable = false;
  
  el.root.on('click', function (e: TopoEvent) {
    if (el.resizable && e.target !== el) {
      removeResizeHandlers(el);
    }
  })

  el.on('click', function (e: TopoEvent) {
    if (!el.resizable) {
      addResizeHandlers(el)
    }
  })
}

function addResizeHandlers (el: TopoBlock) {
  const parent = el.parent;
  const resizer = new TopoResizer(el);

  parent.add(resizer);
  el.resizable = true;
}

function removeResizeHandlers (el: TopoBlock) {
  el.resizable = false;

  let resizer = el.parent.children.filter(n => {
    return n instanceof TopoResizer &&  n.target === el
  })[0]
  el.parent.remove(resizer);
}

function handleResize (el: TopoResizeHandler) {
  let prevX: number;
  let prevY: number;

  el.on('mouseenter', function (e) {
    e.stopPropagation();
    e.originalEvent.target.style.cursor = 'move';
  })
  
  el.on('mouseleave', function (e) {
    e.stopPropagation();
    e.originalEvent.target.style.cursor = 'default';
  })
  el.on('dragstart', function (e: TopoEvent) {
    e.stopPropagation();
    prevX = e.x;
    prevY = e.y;
  })
  
  el.on('drag', function (e: TopoEvent) {
    e.stopPropagation();
    let dx: number, dy: number;
    if (el.parent) {
      let { x: x0, y: y0 } = el.parent.getRelativeCoord(prevX, prevY);
      let { x: x1, y: y1 } = el.parent.getRelativeCoord(e.x, e.y);
      dx = x1 - x0;
      dy = y1 - y0;
    } else {
      dx = e.x - prevX;
      dy = e.y - prevY;
    }
    transform(el.parent.target, dx, dy, el.dir);
    prevX = e.x;
    prevY = e.y;
  })
}

function transform (el, dx, dy, dir) {
  let { width, height } = el;
  switch (dir) {
    case 'n':
      el.height = Math.max(0, height - dy);
      el.y -= (el.height - height) / 2;
      break;
    case 's':
      el.height = Math.max(0, height + dy);
      el.y += (el.height - height) / 2;
      break;
    case 'w':
      el.width = Math.max(0, width - dx);
      el.x -= (el.width - width) / 2;
      break;
    case 'e':
      el.width = Math.max(0, width + dx);
      el.x += (el.width - width) / 2;
      break;
    case 'ne':
      el.height = Math.max(0, el.height - dy);
      el.width = Math.max(0, el.width + dx);
      el.x += (el.width - width) / 2;
      el.y -= (el.height - height) / 2;
      break;
    case 'se':
      el.height = Math.max(0, el.height + dy);
      el.width = Math.max(0, el.width + dx);
      el.x += (el.width - width) / 2;
      el.y += (el.height - height) / 2;
      break;
    case 'nw':
      el.height = Math.max(0, el.height - dy);
      el.width = Math.max(0, el.width - dx);
      el.x -= (el.width - width) / 2;
      el.y -= (el.height - height) / 2;
      break;
    case 'sw':
      el.height = Math.max(0, el.height + dy);
      el.width = Math.max(0, el.width - dx);
      el.x -= (el.width - width) / 2;
      el.y += (el.height - height) / 2;
      break;
  }
}

function handleRotate(el: TopoRotateHandler) {
  let prevX: number;
  let prevY: number;

  el.on('mouseenter', function (e) {
    e.stopPropagation();
    e.originalEvent.target.style.cursor = 'move';
  })
  
  el.on('mouseleave', function (e) {
    e.stopPropagation();
    e.originalEvent.target.style.cursor = 'default';
  })
  el.on('dragstart', function (e: TopoEvent) {
    e.stopPropagation();
    prevX = e.x;
    prevY = e.y;
  })
  
  el.on('drag', function (e: TopoEvent) {
    e.stopPropagation();
    let { x, y } = el.parent.target.resolveCoord(null);
    let v0 = [prevX - x, prevY - y];
    let v1 = [e.x - x, e.y - y];
    let angle = vector.angle(v0, v1) / Math.PI * 180;

    if (!isNaN(angle)) {
      el.parent.target.rotate(vector.cross(v0, v1) > 0 ? angle : -angle);
      prevX = e.x;
      prevY = e.y;
    }
  })
}
export default resizable;