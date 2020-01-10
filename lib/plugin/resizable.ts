import TopoBlock from '../core/classes/block';
import TopoGroup from '../core/classes/group';
import TopoView from '../core/classes/view';
import TopoEvent from '../event/TopoEvent';
import Coord from '../util/coord';

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
      this.add(resizeHandler)
    })
  }

  render (ctx: CanvasRenderingContext2D) {
    let { x, y, width, height, rotation, scale } = this.target;

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
  console.log(parent);
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
    prevX = e.originalEvent.offsetX;
    prevY = e.originalEvent.offsetY;
  })
  
  el.on('drag', function (e: TopoEvent) {
    e.stopPropagation();
    let dx: number, dy: number;
    if (el.parent) {
      let { x: x0, y: y0 } = el.parent.getRelativeCoord(prevX, prevY);
      let { x: x1, y: y1 } = el.parent.getRelativeCoord(e.originalEvent.offsetX, e.originalEvent.offsetY);
      dx = x1 - x0;
      dy = y1 - y0;
    } else {
      dx = e.originalEvent.offsetX - prevX;
      dy = e.originalEvent.offsetY - prevY;
    }
    transform(el.parent.target, dx, dy, el.dir);
    prevX = e.originalEvent.offsetX;
    prevY = e.originalEvent.offsetY;
  })
}

function transform (el, dx, dy, dir) {
  let { x, y, width, height } = el;
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
export default resizable;