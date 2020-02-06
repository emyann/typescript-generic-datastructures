import { Graph, LinkedList, GraphEdge, GraphVertex, VertexKeyExtractor } from '../index';
import { EdgeKeyExtractor } from '../data-structures';
interface User {
  age: number;
}

/** LinkedList Example */
const linkedList = new LinkedList<User>({ keyExtractor: a => a.age });

linkedList.append({ age: 10 }).append({ age: 15 });
console.log(
  'LinkedList items => ',
  linkedList.toArray().map(node => node.value)
);

/** Graph Example */
enum LinkKind {
  Friend = 'friend',
  Parent = 'parent'
}
interface UserLink {
  id: string;
  kind: LinkKind;
}
const keyExtractor: VertexKeyExtractor<User> = user => user.age;
const edgeKeyExtractor: EdgeKeyExtractor<GraphEdge<User, UserLink>> = edge => edge.value.id;

const graph = new Graph<User, UserLink>(true);
const vertex1 = new GraphVertex<User, UserLink>({ age: 10 }, keyExtractor);
const vertex2 = new GraphVertex<User, UserLink>({ age: 22 }, keyExtractor);
const edge = new GraphEdge<User, UserLink>(vertex1, vertex2, { id: '1', kind: LinkKind.Friend }, edgeKeyExtractor);

const vertex3 = new GraphVertex<User, UserLink>({ age: 30 }, keyExtractor);
const vertex4 = new GraphVertex<User, UserLink>({ age: 35 }, keyExtractor);
const edge2 = new GraphEdge<User, UserLink>(vertex3, vertex4, { id: '2', kind: LinkKind.Parent }, edgeKeyExtractor);
const edge3 = new GraphEdge<User, UserLink>(vertex3, vertex4, { id: '3', kind: LinkKind.Parent }, edgeKeyExtractor);

graph
  .addVertex(vertex1)
  .addVertex(vertex2)
  .addEdge(edge)
  .addVertex(vertex3)
  .addVertex(vertex4)
  .addEdge(edge2)
  .addEdge(edge3);
console.log('grah vertices =>', graph.getAllVertices());
console.log('grah edges =>', graph.getAllEdges());
