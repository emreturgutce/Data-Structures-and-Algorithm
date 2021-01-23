import { PriorityQueue } from '../heap/priority-queue';
import { DisjointSet } from './disjoint-set';

/**
 * Weighted and directed Graph
 */
class Graph {
    private adjacencyList: Map<string, Map<string, number>>;
    private edges: Map<string[], number>;

    constructor() {
        this.adjacencyList = new Map();
        this.edges = new Map();
    }

    /**
     * Adds a vertex to adjacency list
     * @param vertex - Vertex going to be add to adjacencyList
     */
    addVertex(vertex: string) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Map());
        }
    }

    /**
     * Adds an edge to the adjacency list
     * @param source - Source vertex
     * @param dest - Destination Vertex
     * @param weight - Weight of the edge between source and destination
     */
    addEdge(source: string, dest: string, weight: number) {
        if (this.adjacencyList.has(source) && this.adjacencyList.has(dest)) {
            this.adjacencyList.set(
                source,
                this.adjacencyList.get(source)!.set(dest, weight),
            );
            this.adjacencyList.set(
                dest,
                this.adjacencyList.get(dest)!.set(source, weight),
            );
            this.edges.set([source, dest].sort(), weight);
        }
    }

    getEdges(): Map<string[], number> {
        return this.edges;
    }

    /**
     * Runs breadth first search algorithm from given vertex
     * @param start - Vertex bfs is going to start from
     * @return Visited vertices
     */
    bfs(start: string): Set<string> {
        const visited = new Set<string>();

        if (!this.adjacencyList.has(start)) return visited;

        const queue = [start];
        visited.add(start);

        while (queue.length > 0) {
            const vertex = queue.shift() as string;

            const neighbors = this.adjacencyList.get(vertex);

            if (neighbors) {
                for (const [key, _] of neighbors) {
                    if (!visited.has(key)) {
                        visited.add(key);
                        queue.push(key);
                    }
                }
            }
        }

        return visited;
    }

    /**
     * Runs depth first search algorithm from given vertex
     * @param start - Vertex dfs is going to start from
     * @return Visited vertices
     */
    dfs(start: string): Set<string> {
        const visited = new Set<string>();

        if (!this.adjacencyList.has(start)) return visited;

        const stack = [start];

        while (stack.length > 0) {
            const vertex = stack.pop() as string;
            visited.add(vertex);

            const neighbors = this.adjacencyList.get(vertex);

            if (neighbors) for (const [key, _] of neighbors) stack.push(key);
        }

        return visited;
    }

    /**
     * Dijkstra Algorithm to find the shortest path between source and dest
     * @param source - Source vertex
     * @param dest - Destination vertex
     * @return Distance between them
     */
    dijkstra(source: string, dest: string): string[] {
        if (!this.adjacencyList.has(source) || !this.adjacencyList.has(dest)) {
            throw new Error(
                'source or destination does not exist in the graph',
            );
        }

        const nodes = new PriorityQueue<string>();
        const distances = new Map<string, number>();
        const previous = new Map<string, string | null>();
        const path: string[] = [];
        let smallest: string;
        const visited: string[] = [];

        for (const [key, _] of this.adjacencyList) {
            const val = key === source ? 0 : Number.MAX_SAFE_INTEGER;
            distances.set(key, val);
            nodes.enqueue(key, val);
            previous.set(key, null);
        }

        while (visited.length < distances.size) {
            smallest = nodes.dequeue().data;
            visited.push(smallest);

            if (smallest === dest) {
                while (previous.has(smallest)) {
                    path.push(smallest);
                    smallest = previous.get(smallest) as string;
                }
                break;
            }

            if (
                smallest ||
                distances.get(smallest) !== Number.MAX_SAFE_INTEGER
            ) {
                for (const [key, val] of this.adjacencyList.get(
                    smallest,
                ) as Map<string, number>) {
                    const candidate = (distances.get(smallest) as number) + val;

                    if (candidate < (distances.get(key) as number)) {
                        distances.set(key, candidate);
                        previous.set(key, smallest);
                        nodes.changePriority(key, candidate);
                    }
                }
            }
        }

        return path.reverse();
    }

    /**
     * Bellman-Ford Algorithm to find the shortest path between source and dest
     * @param source - Source vertex
     * @param dest - Destination vertex
     * @return Distance between them
     */
    bellmanFord(source: string, dest: string): string[] {
        if (!this.adjacencyList.has(source)) {
            throw new Error(
                'source or destination does not exist in the graph',
            );
        }

        const distances = new Map<string, number>();
        const previous = new Map<string, string | null>();
        const path: string[] = [];
        let val: string | null = dest;

        for (const [key, _] of this.adjacencyList) {
            previous.set(key, null);
            distances.set(key, Number.MAX_SAFE_INTEGER);
        }

        distances.set(source, 0);

        for (let i = 0; i < this.adjacencyList.size - 1; i++) {
            for (const [key, _] of this.adjacencyList) {
                const neighbors = this.adjacencyList.get(key) as Map<
                    string,
                    number
                >;

                for (const [neighborKey, edgeWeight] of neighbors) {
                    const distanceToNeighbor =
                        (distances.get(key) as number) + edgeWeight;

                    if (
                        distanceToNeighbor <
                        (distances.get(neighborKey) as number)
                    ) {
                        distances.set(neighborKey, distanceToNeighbor);
                        previous.set(neighborKey, key);
                    }
                }
            }
        }

        while (val !== null) {
            path.unshift(val);
            val = previous.get(val) as string;
        }

        return path;
    }

    /**
     * Prim's algorithm to find the minimum spaning tree of the given graph
     * @param source - Vertex prim's algorithm is going to start from
     * @return Minimum spanning tree
     */
    prim(source: string): Graph {
        const priorityQueue = new PriorityQueue<string>();
        const previous = new Map<string, string | null>();
        const distances = new Map<string, number>();
        const visited = new Set<string>();
        const spanningTree = new Graph();

        for (const [key, _] of this.adjacencyList) {
            priorityQueue.enqueue(key, Number.MAX_SAFE_INTEGER);
            distances.set(key, Number.MAX_SAFE_INTEGER);
            previous.set(key, null);
            spanningTree.addVertex(key);
        }

        priorityQueue.changePriority(source, 0);
        distances.set(source, 0);

        while (!priorityQueue.isEmpty()) {
            const currentVertex = priorityQueue.dequeue();
            visited.add(currentVertex.data);

            for (const [key, value] of this.adjacencyList.get(
                currentVertex.data,
            ) as Map<string, number>) {
                const candidate = currentVertex.priority + value;
                if (
                    !visited.has(key) &&
                    (distances.get(key) as number) > candidate
                ) {
                    spanningTree.addEdge(
                        key,
                        currentVertex.data,
                        currentVertex.priority,
                    );
                    priorityQueue.changePriority(key, candidate);
                    previous.set(key, currentVertex.data);
                    distances.set(key, candidate);
                }
            }
        }

        return spanningTree;
    }

    /**
     * Kruskal's algorithm to find the minimum spaning tree of the given graph
     * @return Minimum spanning tree
     */
    kruskal(): Graph {
        const spanningTree = new Graph();
        const priorityQueue = new PriorityQueue<string[]>();
        const disjointSet = new DisjointSet<string>();

        for (const [key, _] of this.adjacencyList) {
            disjointSet.makeSet(key);
            spanningTree.addVertex(key);
        }

        for (const [key, value] of this.getEdges()) {
            priorityQueue.enqueue(key, value);
        }

        while (!priorityQueue.isEmpty()) {
            const currentEdge = priorityQueue.dequeue();
            const startVertex = currentEdge.data[0];
            const endVertex = currentEdge.data[1];

            if (!disjointSet.inSameSet(startVertex, endVertex)) {
                disjointSet.union(startVertex, endVertex);
                spanningTree.addEdge(
                    startVertex,
                    endVertex,
                    currentEdge.priority,
                );
            }
        }

        return spanningTree;
    }

    /**
     * Cycle detection algorithm to determine if there is a cycle in the given graph.
     * @return If there is a cycle true else false.
     */
    detectCycle(): boolean {
        const disjointSet = new DisjointSet<string>();

        for (const [key, _] of this.adjacencyList) {
            disjointSet.makeSet(key);
        }

        let cycleFound = false;

        for (const [[startVertex, endVertex], _] of this.getEdges()) {
            if (disjointSet.inSameSet(startVertex, endVertex)) {
                cycleFound = true;
                break;
            } else {
                disjointSet.union(startVertex, endVertex);
            }
        }

        return cycleFound;
    }

    /**
     * @param start - Start vertex traveling salesman is going to start from
     * @param current - Vertex where traveling salesman currently is.
     * @param visited - Already visited vertices.
     * @param cost - Cost of current travel.
     * @param ans - Minimum cost between all travels.
     * @return Minimum cost
     */
    travelingSalesman(
        start: string,
        current = start,
        visited = new Set<string>(),
        cost = 0,
        ans = Number.MAX_SAFE_INTEGER,
    ): number {
        const currentVertex = this.adjacencyList.get(current) as Map<
            string,
            number
        >;

        if (
            visited.size + 1 === this.adjacencyList.size &&
            currentVertex.has(start)
        ) {
            return Math.min(ans, cost + currentVertex.get(start)!);
        }

        for (const [key, value] of currentVertex) {
            if (!visited.has(key)) {
                visited.add(current);
                ans = this.travelingSalesman(
                    start,
                    key,
                    visited,
                    cost + value,
                    ans,
                );
                visited.delete(current);
            }
        }

        return ans;
    }
}

const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B', 20);
graph.addEdge('A', 'C', 42);
graph.addEdge('B', 'C', 30);
console.log(graph.tsp('A'));
