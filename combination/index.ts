/**
 *
 * @param arr Given array
 * @param r Size of a combination
 * @param data Array that is going to have the current combination
 * @param start Starting index of arr
 * @param count Stores how many elements are there in data
 */
function printCombination(
    arr: number[],
    r: number,
    data: number[] = [],
    start: number = 0,
    count: number = 0,
): void {
    if (count === r) return console.log(data.slice(0, r));

    const end = arr.length - 1;

    for (let i = start; i <= end && end - i + 1 >= r - count; i++) {
        data[count] = arr[i];
        printCombination(arr, r, data, i + 1, count + 1);
    }
}

const arr = [1, 2, 3, 4, 5];
const r: number = 3;

printCombination(arr, r);
