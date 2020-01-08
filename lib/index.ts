import TopoNode from './core/classes/node';
import TopoEdge from './core/classes/edge';
import TopoView from './core/classes/view';

const topo = {
  TopoNode,
  TopoEdge,

  init () {
    const tp:TopoView = new TopoView();

    return tp;
  }
};

export default topo;