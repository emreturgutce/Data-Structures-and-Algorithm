/**
 * @param arr Array that we are finding all possible paths of
 * @param currPath Current jumps we made
 */
function allPathsJumpGame(arr: number[], currPath: number[] = []): void {
    if (arr.length === 1) return console.log(currPath);

    const maxJumpLength = Math.min(arr[0], arr.length - 1);

    for (let i = 1; i <= maxJumpLength; i++) {
        currPath.push(i);

        allPathsJumpGame([...arr.slice(i, arr.length)], currPath);

        currPath.pop();
    }
}

const arr = [2, 3, 5, 1, 4];
allPathsJumpGame(arr);
