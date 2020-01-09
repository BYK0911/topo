import TopoNode from './core/classes/node';
import TopoEdge from './core/classes/edge';
import TopoZEdge from './core/classes/zEdge';
import TopoSEdge from './core/classes/sEdge';
import TopoView from './core/classes/view';

const topo = {
  TopoNode,
  TopoEdge,
  TopoZEdge,
  TopoSEdge,

  init () {
    const view:TopoView = new TopoView();

    return view;
  }
};

export default topo;