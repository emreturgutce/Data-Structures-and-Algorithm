class DisjointSetNode<T> {
    readonly data: T;
    rank: number = 0;
    parent: DisjointSetNode<T>;

    constructor(data: T) {
        this.data = data;
        this.parent = this;
    }
}

export class DisjointSet<T> {
    private list: Map<T, DisjointSetNode<T>> = new Map();

    makeSet(data: T): void {
        const node = new DisjointSetNode(data);
        this.list.set(data, node);
    }

    union(data1: T, data2: T): boolean {
        const node1 = this.list.get(data1) as DisjointSetNode<T>;
        const node2 = this.list.get(data2) as DisjointSetNode<T>;

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

    private findSet(node: DisjointSetNode<T>): DisjointSetNode<T> {
        const parent = node.parent;

        if (parent === node) return parent;

        return (node.parent = this.findSet(node.parent));
    }

    findSetByNumber(node: T) {
        return this.findSet(this.list.get(node) as DisjointSetNode<T>).data;
    }

    inSameSet(val1: T, val2: T): boolean {
        const node1 = this.list.get(val1) as DisjointSetNode<T>;
        const node2 = this.list.get(val2) as DisjointSetNode<T>;

        return this.findSet(node1) === this.findSet(node2);
    }
}

const ds = new DisjointSet<number>();
ds.makeSet(1);
ds.makeSet(2);
ds.makeSet(3);
ds.makeSet(4);

ds.union(1, 2);

console.log(ds.findSetByNumber(1));
console.log(ds.findSetByNumber(2));
console.log(ds.findSetByNumber(3));
console.log(ds.findSetByNumber(4));
