/**
 * @param arr Array that we are forming power-set of
 * @param allSubsets All subsets that have been formed so far
 * @param currentSubset Subset that we are currently forming
 * @param start The position of in original set we are starting to form current subset
 * @return All subsets of given array
 */
function findAllSubsets<T>(
    arr: T[],
    allSubsets: [T[]] = [[]],
    currentSubset: T[] = [],
    start: number = 0,
): [T[]] {
    for (let position = start; position < arr.length; position++) {
        currentSubset.push(arr[position]);

        allSubsets.push([...currentSubset]);

        findAllSubsets(arr, allSubsets, currentSubset, position + 1);

        currentSubset.pop();
    }

    return allSubsets;
}

const arr = ['a', 'b', 'c', 'd', 'e'];
console.log(findAllSubsets(arr));
