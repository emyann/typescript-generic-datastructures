import { GraphVertex } from './GraphVertex';
export type EdgeKeyExtractor<T> = (edge: T) => string | number;

export class GraphEdge<TVertex, TEdge> {
  constructor(
    public startVertex: GraphVertex<TVertex, TEdge>,
    public endVertex: GraphVertex<TVertex, TEdge>,
    public value: TEdge,
    private keyExtractor?: EdgeKeyExtractor<GraphEdge<TVertex, TEdge>>
  ) {}

  getKey() {
    if (!this.keyExtractor) {
      const startVertexKey = this.startVertex.getKey();
      const endVertexKey = this.endVertex.getKey();

      return `${startVertexKey}_${endVertexKey}`;
    } else {
      return this.keyExtractor(this);
    }
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
