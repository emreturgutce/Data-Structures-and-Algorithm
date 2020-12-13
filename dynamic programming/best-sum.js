function bestSum(targetSum, arr, memo = {}) {
    if (targetSum in memo) return memo[targetSum];
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    let shortestCombination = null;

    for (let num of arr) {
        const remainder = targetSum - num;
        const remainderCombination = bestSum(remainder, arr, memo);

        if (remainderCombination !== null) {
            const combination = [...remainderCombination, num];

            if (
                shortestCombination === null ||
                combination.length < shortestCombination.length
            ) {
                shortestCombination = combination;
            }
        }
    }

    return (memo[targetSum] = shortestCombination);
}

console.log(bestSum(7, [2, 3, 4]));
console.log(bestSum(7, [5, 3, 4, 7]));
console.log(bestSum(7, [2, 4]));
console.log(bestSum(8, [2, 3, 5]));
console.log(bestSum(300, [7, 14]));
