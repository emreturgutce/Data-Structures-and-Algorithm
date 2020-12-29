class WeightedGraph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList.set(vertex1, [
            ...this.adjacencyList.get(vertex1),
            { node: vertex2, weight },
        ]);
        this.adjacencyList.set(vertex2, [
            ...this.adjacencyList.get(vertex2),
            { node: vertex1, weight },
        ]);
    }
}

const weightedGraph = new WeightedGraph();

weightedGraph.addVertex('A');
weightedGraph.addVertex('B');
weightedGraph.addVertex('C');
weightedGraph.addEdge('A', 'B', 9);
weightedGraph.addEdge('A', 'C', 5);
weightedGraph.addEdge('B', 'C', 7);
console.log(weightedGraph.adjacencyList);
