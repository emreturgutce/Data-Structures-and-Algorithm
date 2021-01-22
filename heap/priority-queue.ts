class PriorityQueueNode<T> {
    readonly data: T;
    priority: number;

    constructor(data: T, priority: number) {
        this.data = data;
        this.priority = priority;
    }
}

export class PriorityQueue<T> {
    private content: PriorityQueueNode<T>[] = [];

    enqueue(data: T, priority: number): void {
        this.content.push(new PriorityQueueNode(data, priority));
        this.bubbleUp();
    }

    dequeue(): PriorityQueueNode<T> {
        const node = this.content[0];

        if (this.content.length > 1) {
            this.content[0] = this.content.pop() as PriorityQueueNode<T>;
            this.sinkDown();
        } else {
            this.content.pop();
        }

        return node;
    }

    size(): number {
        return this.content.length;
    }

    isEmpty(): boolean {
        return this.content.length === 0;
    }

    changePriority(key: T, priority: number): void {
        const val = this.content.find((value) => value.data === key);

        if (val) {
            val.priority = priority;
            this.bubbleUp(this.content.indexOf(val));
        }
    }

    contains(key: T): boolean {
        return !!this.content.find((vertex) => vertex.data === key);
    }

    private bubbleUp(index: number = this.content.length - 1) {
        const node = this.content[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parentNode = this.content[parentIndex];

            if (node.priority >= parentNode.priority) break;

            this.swap(index, parentIndex);

            index = parentIndex;
        }
    }

    private sinkDown(index: number = 0) {
        const node = this.content[index];
        const length = this.content.length;

        while (index < length) {
            let swap: number | null = null;
            const rightIndex = (index + 1) * 2;
            const leftIndex = rightIndex - 1;
            let leftPriority: number;

            if (leftIndex < length) {
                const leftNode = this.content[leftIndex];
                leftPriority = leftNode.priority;

                if (node.priority > leftPriority) {
                    swap = leftIndex;
                }
            }

            if (rightIndex < length) {
                const rightNode = this.content[rightIndex];
                const rightPriority = rightNode.priority;

                if (node.priority > rightPriority) {
                    if (
                        swap === null ||
                        (swap !== null && rightPriority < leftPriority!)
                    ) {
                        swap = rightIndex;
                    }
                }
            }

            if (swap === null) break;

            this.swap(index, swap);

            index = swap;
        }
    }

    private swap(index1: number, index2: number) {
        const temp = this.content[index1];
        this.content[index1] = this.content[index2];
        this.content[index2] = temp;
    }
}
