function canSum(targetSum, arr, memo = {}) {
    if (targetSum in memo) return memo[targetSum];
    if (targetSum === 0) return true;
    if (targetSum < 0) return false;

    for (let num of arr) {
        const val = targetSum - num;

        if (canSum(val, arr, memo)) {
            return (memo[targetSum] = true);
        }
    }

    return (memo[targetSum] = false);
}

console.log(canSum(7, [2, 3])); // true
console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [2, 4])); // false
console.log(canSum(8, [2, 3, 5])); // true
console.log(canSum(300, [7, 14])); // false
