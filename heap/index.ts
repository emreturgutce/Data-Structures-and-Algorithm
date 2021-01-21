type ScoreFunction<T> = (x: T) => number;

class Heap<T> {
    private content: T[];
    private scoreFunction: ScoreFunction<T>;

    constructor(scoreFunction: ScoreFunction<T>) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    /**
     * Add a node to the heap
     * @param node - Node which is going to be pushed to heap
     */
    push(node: T) {
        this.content.push(node);
        this.bubbleUp(this.content.length - 1);
    }

    /**
     * Remove the node which is at the top of the heap
     */
    pop(): T {
        const node = this.content[0];

        if (this.content.length > 0) {
            this.content[0] = this.content.pop() as T;
            this.sinkDown(0);
        }

        return node;
    }

    /**
     * Remove the given node from heap
     * @param node - Node which is going to be removed from heap
     */
    remove(node: T) {
        const heapSize = this.content.length;

        for (let i = 0; i < heapSize; i++) {
            if (this.content[i] !== node) continue;

            if (i === heapSize - 1) break;

            this.content[i] = this.content.pop() as T;

            this.bubbleUp(i);
            this.sinkDown(i);

            break;
        }
    }

    /**
     * Returns the size of the heap
     */
    size() {
        return this.content.length;
    }

    /**
     * Find the right spot for the newly added element
     * @param n - Where are we going to start bubble up from
     */
    private bubbleUp(n: number) {
        const element = this.content[n];
        const score = this.scoreFunction(element);

        while (n > 0) {
            const parentIndex = Math.floor((n + 1) / 2) - 1;
            const parent = this.content[parentIndex];

            if (score >= this.scoreFunction(parent)) break;

            this.content[parentIndex] = element;
            this.content[n] = parent;

            n = parentIndex;
        }
    }

    /**
     * When we remove an element the spot that we just remove the element from
     * will be vacant then we get the last element and put it there and sink
     * down the element until we find the right spot.
     * @param n - Where are we going to start sink down from
     */
    private sinkDown(n: number) {
        const length = this.content.length;
        const element = this.content[n];
        const score = this.scoreFunction(element);

        while (true) {
            const rightChildIndex = (n + 1) * 2;
            const leftChildIndex = rightChildIndex - 1;
            let swap: number | null = null;
            let leftChildScore: number;

            if (leftChildIndex < length) {
                const leftChild = this.content[leftChildIndex];
                leftChildScore = this.scoreFunction(leftChild);

                if (leftChildScore < score) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                const rightChild = this.content[rightChildIndex];
                const rightChildScore = this.scoreFunction(rightChild);

                if (
                    swap === null ||
                    (swap !== null && rightChildScore < leftChildScore!)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.content[n] = this.content[swap];
            this.content[swap] = element;

            n = swap;
        }
    }
}

const heap = new Heap<number>((x) => x);

[10, 3, 4, 8, 2].forEach((val) => heap.push(val));
console.log(heap);
heap.remove(2);
console.log(heap);
