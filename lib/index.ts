import TopoNodeElement from './core/classes/TopoNodeElement';
import TopoEdgeElement from './core/classes/TopoEdgeElement';
import TopoView from './core/classes/TopoView';

const topo = {
  TopoNodeElement,
  TopoEdgeElement,

  init () {
    const tp:TopoView = new TopoView();

    return tp;
  }
};

export default topo;