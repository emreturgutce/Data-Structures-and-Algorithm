class PriorityQueueNode<T> {
    readonly data: T;
    readonly priority: number;

    constructor(data: T, priority: number) {
        this.data = data;
        this.priority = priority;
    }
}

class PriorityQueue<T> {
    private content: PriorityQueueNode<T>[] = [];

    enqueue(data: T, priority: number): void {
        this.content.push(new PriorityQueueNode(data, priority));
        this.bubbleUp(this.content.length - 1);
    }

    dequeue(): PriorityQueueNode<T> {
        if (this.content.length) {
            this.content[0] = this.content.pop();
            this.sinkDown(0);
        }

        return this.content[0];
    }

    private bubbleUp(index: number) {
        const node = this.content[index];

        while (index > 0) {
            const parentIndex = Math.floor((index + 1) / 2) - 1;
            const parentNode = this.content[parentIndex];

            if (node.priority >= parentNode.priority) break;

            this.swap(index, parentIndex);

            index = parentIndex;
        }
    }

    private sinkDown(index: number) {
        const node = this.content[index];
        const length = this.content.length;

        while (true) {
            let swap: number | null = null;
            const rightIndex = (index + 1) * 2;
            const leftIndex = rightIndex - 1;

            if (leftIndex < length) {
                const leftNode = this.content[leftIndex];

                if (node.priority > leftNode.priority) {
                    swap = leftIndex;
                }
            }

            if (rightIndex < length) {
                const rightNode = this.content[rightIndex];

                if (node.priority > rightNode.priority) {
                    swap = swap === null ? rightIndex : swap;
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

const priorityQueue = new PriorityQueue<number>();

[10, 3, 4, 8, 2].forEach((val) => priorityQueue.enqueue(val, val));
console.log(priorityQueue);
priorityQueue.dequeue();
console.log(priorityQueue);
