type ScoreFunction<T> = (x: T) => number;

class Heap<T> {
    private content: T[];
    private scoreFunction: ScoreFunction<T>;

    constructor(scoreFunction: ScoreFunction<T>) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    /**
     * Adds a node to the heap
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
        if (this.content.length > 0) {
            this.content[0] = this.content.pop();
            this.sinkDown(0);
        }

        return this.content[0];
    }

    /**
     * Removes the given node from heap
     * @param node - Node which is going to be removed from heap
     */
    remove(node: T) {
        const heapSize = this.content.length;

        for (let i = 0; i < heapSize; i++) {
            if (this.content[i] !== node) continue;

            if (i === heapSize - 1) break;

            this.content[i] = this.content.pop();

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
     * Finds the right spot for the newly added element
     * @param n - Where are we going to start bubble up from
     */
    private bubbleUp(n: number) {
        const element = this.content[n];
        const score = this.scoreFunction(element);

        while (n > 0) {
            const parentN = Math.floor((n + 1) / 2) - 1;
            const parent = this.content[parentN];

            if (score >= this.scoreFunction(parent)) break;

            this.content[parentN] = element;
            this.content[n] = parent;

            n = parentN;
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
        const elemScore = this.scoreFunction(element);

        while (true) {
            const child2N = (n + 1) * 2;
            const child1N = child2N - 1;
            let swap = null;

            if (child1N < length) {
                const child1 = this.content[child1N];
                var child1Score = this.scoreFunction(child1);

                if (child1Score < elemScore) swap = child1N;
            }

            if (child2N < length) {
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap == null ? elemScore : child1Score))
                    swap = child2N;
            }

            if (swap == null) break;

            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }
}

const heap = new Heap<number>((x) => x);

[10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5].forEach((val) => heap.push(val));
console.log(heap);
heap.remove(2);
console.log(heap);
