/**
 * values,weights/capacity
 *      0  1  2  3  4  5  6  7
 *     ------------------------
 *  0 | 0  0  0  0  0  0  0  0
 *  1 | 0  0  0  2  2  2  2  2
 *  2 | 0  2  2  2  4  4  4  4
 *  3 | 0  2  2  4  6  6  6  8
 *  4 | 0  2  2  4  6  7  7  9
 *  5 | 0  2  3  5  6  7  9  10
 */

/**
 *
 * @param capacity - The maximum capacity of the knapsack
 * @param weights - The weights of the items
 * @param values - The values of the items
 * @return The items that selected to get the maximum profit
 */
function knapsack(
    capacity: number,
    weights: number[],
    values: number[],
): number[] {
    const N = weights.length;

    const dp = new Array<number | null>(N + 1)
        .fill(null)
        .map(() => new Array<number>(capacity + 1).fill(0));

    for (let currRow = 1; currRow <= N; currRow++) {
        // Get weight and value for current row
        const w = weights[currRow - 1];
        const v = values[currRow - 1];

        for (let currSz = 1; currSz <= capacity; currSz++) {
            dp[currRow][currSz] = dp[currRow - 1][currSz];

            // Check if current item can and should be fit in
            if (
                currSz >= w &&
                dp[currRow - 1][currSz - w] + v > dp[currRow][currSz]
            ) {
                dp[currRow][currSz] = dp[currRow - 1][currSz - w] + v;
            }
        }
    }

    let sz = capacity;

    const selectedItems = new Array<number>();

    for (let i = N; i > 0; i--) {
        // Check if the current value is equal to the row above it if not equal then
        // that means the current element must be added to knapsack.
        if (dp[i][sz] !== dp[i - 1][sz]) {
            selectedItems.unshift(i);
            sz -= weights[i - 1];
        }
    }

    return selectedItems;
}

const capacity = 7;
const weights = [3, 1, 3, 4, 2];
const values = [2, 2, 4, 5, 3];

console.log(knapsack(capacity, weights, values));
