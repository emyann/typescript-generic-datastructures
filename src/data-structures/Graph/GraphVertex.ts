import { LinkedList } from '../LinkedList/LinkedList';
import { CompareFunction } from '../../utilities/Comparator';
import { GraphEdge } from './GraphEdge';
import { LinkedListNode } from '../LinkedList/LinkedListNode';

export type VertexKeyExtractor<T> = (vertex: T) => string | number;

export class GraphVertex<TVertex, TEdge> {
  value: TVertex;
  edges: LinkedList<GraphEdge<TVertex, TEdge>>;
  constructor(value: TVertex, public keyExtractor: VertexKeyExtractor<TVertex>) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    const edgeComparator: CompareFunction<GraphEdge<TVertex, TEdge>> = (edgeA, edgeB) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;
    this.edges = new LinkedList({ compareFunction: edgeComparator });
  }

  addEdge(edge: GraphEdge<TVertex, TEdge>) {
    this.edges.append(edge);

    return this;
  }

  deleteEdge(edge: GraphEdge<TVertex, TEdge>) {
    this.edges.delete(edge);
  }

  getNeighbors(): GraphVertex<TVertex, TEdge>[] {
    const edges = this.edges.toArray();

    const neighborsConverter = (node: LinkedListNode<GraphEdge<TVertex, TEdge>>) => {
      return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
    };

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  getEdges() {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value);
  }

  getDegree() {
    return this.edges.toArray().length;
  }

  hasEdge(requiredEdge: GraphEdge<TVertex, TEdge>) {
    const edgeNode = this.edges.find({
      callback: edge => edge === requiredEdge
    });

    return !!edgeNode;
  }

  hasNeighbor(vertex: GraphVertex<TVertex, TEdge>) {
    const vertexNode = this.edges.find({
      callback: edge => edge.startVertex === vertex || edge.endVertex === vertex
    });

    return !!vertexNode;
  }

  findEdge(vertex: GraphVertex<TVertex, TEdge>) {
    const edgeFinder = (edge: GraphEdge<TVertex, TEdge>) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  getKey() {
    return this.keyExtractor(this.value);
  }

  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  toString(callback: (value: TVertex) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
