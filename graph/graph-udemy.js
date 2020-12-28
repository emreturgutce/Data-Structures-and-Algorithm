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
}

const graph = new Graph();

graph.addVertex('Tokyo');
graph.addVertex('Istanbul');
graph.addVertex('San Francisco');
graph.addEdge('Tokyo', 'Istanbul');
graph.addEdge('Tokyo', 'San Francisco');
graph.addEdge('San Francisco', 'Istanbul');
console.log(graph.adjacencyList);
graph.removeEdge('Tokyo', 'San Francisco');
console.log(graph.adjacencyList);
graph.removeVertex('Tokyo');
console.log(graph.adjacencyList);
