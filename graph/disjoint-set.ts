class DisjointSetNode {
    readonly data: number;
    rank: number = 0;
    parent: DisjointSetNode;

    constructor(data: number) {
        this.data = data;
        this.parent = this;
    }
}

class DisjointSet {
    list: Map<number, DisjointSetNode> = new Map();

    makeSet(data: number): void {
        const node = new DisjointSetNode(data);
        this.list.set(data, node);
    }

    union(data1: number, data2: number): boolean {
        const node1 = this.list.get(data1) as DisjointSetNode;
        const node2 = this.list.get(data2) as DisjointSetNode;

        const parent1 = this.findSet(node1);
        const parent2 = this.findSet(node2);

        if (parent1.data === parent2.data) return false;

        if (parent1.rank >= parent2.rank) {
            parent1.rank =
                parent1.rank === parent2.rank ? parent1.rank + 1 : parent1.rank;
            parent2.parent = parent1;
        } else {
            parent1.parent = parent2;
        }

        return true;
    }

    private findSet(node: DisjointSetNode): DisjointSetNode {
        const parent = node.parent;

        if (parent === node) return parent;

        return (node.parent = this.findSet(node.parent));
    }

    findSetByNumber(node: number) {
        return this.findSet(this.list.get(node) as DisjointSetNode).data;
    }
}

const ds = new DisjointSet();
ds.makeSet(1);
ds.makeSet(2);
ds.makeSet(3);
ds.makeSet(4);
ds.makeSet(5);
ds.makeSet(6);
ds.makeSet(7);

ds.union(1, 2);
ds.union(2, 3);
ds.union(4, 5);
ds.union(6, 7);
ds.union(5, 6);
ds.union(3, 7);

console.log(ds.findSetByNumber(1));
console.log(ds.findSetByNumber(2));
console.log(ds.findSetByNumber(3));
console.log(ds.findSetByNumber(4));
console.log(ds.findSetByNumber(5));
console.log(ds.findSetByNumber(6));
console.log(ds.findSetByNumber(7));
