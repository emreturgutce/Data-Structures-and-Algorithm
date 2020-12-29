class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList.set(vertex1, [
            ...this.adjacencyList.get(vertex1),
            vertex2,
        ]);
        this.adjacencyList.set(vertex2, [
            ...this.adjacencyList.get(vertex2),
            vertex1,
        ]);
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList.set(vertex1, [
            ...this.adjacencyList.get(vertex1).filter((v) => v !== vertex2),
        ]);
        this.adjacencyList.set(vertex2, [
            ...this.adjacencyList.get(vertex2).filter((v) => v !== vertex1),
        ]);
    }

    removeVertex(vertex) {
        while (this.adjacencyList.get(vertex).length > 0) {
            this.removeEdge(vertex, this.adjacencyList.get(vertex).pop());
        }
        this.adjacencyList.delete(vertex);
    }

    depthFirstSearchRecursive(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList.get(vertex).forEach((neighbor) => {
                if (!visited[neighbor]) return dfs(neighbor);
            });
        })(start);

        return result;
    }

    depthFirstSearchIterative(start) {
        const stack = [start];
        const result = [];
        const visited = {};
        let currVertex;

        visited[start] = true;

        while (stack.length) {
            currVertex = stack.pop();
            result.push(currVertex);

            this.adjacencyList.get(currVertex).forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }

        return result;
    }

    breadthFirstSearch(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currVertex;

        visited[start] = true;

        while (queue.length) {
            currVertex = queue.shift();
            result.push(currVertex);

            this.adjacencyList.get(currVertex).forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }
}

const graph = new Graph();

/*
        A
      /   \
    B       C
    |       |
    E  ---  D
      \   /
        F
*/

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'E');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');
console.log(graph.breadthFirstSearch('A'));
