function jumpGame(
    arr: number[],
    index: number,
    jump: number,
    memo: Map<number, Map<number, boolean>> = new Map(),
): boolean {
    if (memo.has(index - jump) && memo.get(index - jump)!.has(index)) {
        return memo.get(index - jump)!.get(index) as boolean;
    }

    if (index === arr.length - 1) {
        memoSet(memo, index, jump, true);
        return true;
    }

    if (index >= arr.length || arr[index] === 0) {
        memoSet(memo, index, jump, false);
        return false;
    }

    for (let i = 1; i <= arr[index]; i++) {
        if (jumpGame(arr, i + index, i, memo)) {
            memoSet(memo, index, jump, true);
            return true;
        }
    }

    memoSet(memo, index, jump, false);
    return false;
}

function memoSet(
    memo: Map<number, Map<number, boolean>>,
    index: number,
    jump: number,
    value: boolean,
) {
    memo.set(
        index - jump,
        memo.has(index - jump)
            ? memo.get(index - jump)!.set(index, value)
            : new Map().set(index, value),
    );
}

const arr = [3, 2, 1, 0, 4];

console.time('jump');
console.log(jumpGame(arr, 0, arr[0]));
console.timeEnd('jump');
