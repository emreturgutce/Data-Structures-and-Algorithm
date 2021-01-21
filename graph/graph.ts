import { PriorityQueue } from '../heap/priority-queue';

/**
 * Weighted and directed Graph
 */
class Graph {
    private adjacencyList: Map<string, Map<string, number>>;

    constructor() {
        this.adjacencyList = new Map();
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
        }
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
}

const graph = new Graph();

graph.addVertex('1');
graph.addVertex('2');
graph.addVertex('3');
graph.addVertex('4');
graph.addVertex('5');
graph.addVertex('6');
graph.addEdge('1', '2', 7);
graph.addEdge('1', '3', 9);
graph.addEdge('1', '6', 14);
graph.addEdge('6', '3', 2);
graph.addEdge('3', '2', 10);
graph.addEdge('6', '5', 9);
graph.addEdge('3', '4', 11);
graph.addEdge('2', '4', 15);
graph.addEdge('5', '4', 6);
console.log(graph.bellmanFord('1', '5'));
