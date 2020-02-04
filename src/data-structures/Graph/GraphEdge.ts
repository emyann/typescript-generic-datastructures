import { GraphVertex } from './GraphVertex';

export class GraphEdge<TVertex, TEdge> {
  constructor(public startVertex: GraphVertex<TVertex, TEdge>, public endVertex: GraphVertex<TVertex, TEdge>, public value: TEdge) {}

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse() {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  toString() {
    return this.getKey();
  }
}
