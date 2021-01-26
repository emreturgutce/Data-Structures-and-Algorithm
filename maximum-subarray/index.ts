function maximumSubarray(arr: number[]): number {
	let globalMaximum = arr[0];
	let maxCurrent = arr[0];

	for (const val of arr) {
		maxCurrent = Math.max(val, maxCurrent + val);
		if (maxCurrent > globalMaximum) globalMaximum = maxCurrent;
	}

	return globalMaximum;
}

const arr = [1, -3, 2, 1, -1];

console.log(maximumSubarray(arr));
