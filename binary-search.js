function binarySearch(arr, key) {
    let l = 0;
    let h = arr.length;

    while (l <= h) {
        let mid = Math.floor((l + h) / 2);

        if (key === arr[mid]) return mid;
        if (key < arr[mid]) {
            h = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return -1;
}

console.log(binarySearch([1, 4, 8, 14, 18, 34, 57, 80, 101], 18));
