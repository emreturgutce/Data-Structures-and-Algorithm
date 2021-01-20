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
     * Dijkstra Algorithm
     * @param source - Source vertex
     * @param dest - Destination vertex
     * @return Distance between them
     */
    dijkstra(source: string, dest: string): number {
        if (!this.adjacencyList.has(source) || !this.adjacencyList.has(dest)) {
            throw new Error(
                'source or destination does not exist in the graph',
            );
        }

        const distances = new Map<string, number>();
        const stack: string[] = [];

        for (const [key, _] of this.adjacencyList) {
            distances.set(key, Number.MAX_SAFE_INTEGER);
        }

        distances.set(source, 0);

        for (const [key, val] of this.adjacencyList.get(source) as Map<
            string,
            number
        >) {
            if (val < 0) {
                throw new Error(
                    'Cannot calculate shortest path for negative edges with dijkstra',
                );
            }
            distances.set(key, val);
            stack.push(key);
        }

        while (stack.length > 0) {
            const vertex = stack.pop() as string;

            for (const [key, val] of this.adjacencyList.get(vertex) as Map<
                string,
                number
            >) {
                if (val < 0) {
                    throw new Error(
                        'Cannot calculate shortest path for negative edges with dijkstra',
                    );
                }
                stack.push(key);
                const distance = (distances.get(vertex) as number) + val;
                if (
                    distances.has(key) &&
                    (distances.get(key) as number) > distance
                ) {
                    distances.set(key, distance);
                }
            }
        }

        return distances.get(dest) as number;
    }
}

const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B', 6);
graph.addEdge('A', 'C', 5);
graph.addEdge('B', 'C', 6);
graph.addEdge('B', 'D', 2);
graph.addEdge('C', 'E', 2);
graph.addEdge('D', 'C', 8);
graph.addEdge('D', 'E', 1);
graph.addEdge('D', 'F', 6);
graph.addEdge('E', 'F', 3);
console.log(graph.dijkstra('A', 'F'));
