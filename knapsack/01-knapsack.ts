namespace zerooneknapsack {
    function knapsack(
        capacity: number,
        weights: number[],
        profits: number[],
    ): number {
        const n = weights.length;

        if (n === 0 || capacity === 0) return 0;

        if (weights[0] > capacity) {
            return knapsack(capacity, weights.slice(1, n), profits.slice(1, n));
        }

        return Math.max(
            profits[0] +
                knapsack(
                    capacity - weights[0],
                    weights.slice(1, n),
                    profits.slice(1, n),
                ),
            knapsack(capacity, weights.slice(1, n), profits.slice(1, n)),
        );
    }

    function knapsackTabulation(
        capacity: number,
        weights: number[],
        profits: number[],
    ): number[] {
        const dp = new Array(weights.length + 1)
            .fill(null)
            .map(() => new Array<number>(capacity + 1).fill(0));

        for (let i = 1; i <= weights.length; i++) {
            for (let j = 1; j <= capacity; j++) {
                dp[i][j] =
                    weights[i - 1] > j
                        ? dp[i - 1][j]
                        : Math.max(
                              profits[i - 1] + dp[i - 1][j - weights[i - 1]],
                              dp[i - 1][j],
                          );
            }
        }

        let i = weights.length;
        let j = capacity;
        const arr: number[] = [];

        while (i > 0 && j > 0) {
            if (dp[i][j] !== dp[i - 1][j]) {
                arr.unshift(i);
                j -= weights[i - 1];
            }
            i--;
        }

        return arr;
    }

    const weights = [2, 3, 4, 5];
    const profits = [1, 2, 5, 6];
    const capacity = 8;

    knapsackTabulation(capacity, weights, profits);
}
