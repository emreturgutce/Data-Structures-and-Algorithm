function partition(arr: number[], l: number, h: number): number {
	const swap = (left: number, right: number): void => {
		const temp = arr[left];
		arr[left] = arr[right];
		arr[right] = temp;
	};

	const pivot = arr[h];
	let partitionIndex = l;

	for (let i = l; i < h; i++) {
		if (arr[i] < pivot) {
			swap(partitionIndex, i);
			partitionIndex++;
		}
	}

	swap(partitionIndex, h);

	return partitionIndex;
}

function quickSort(arr: number[], l = 0, h = arr.length - 1) {
	if (l < h) {
		const partitionIndex = partition(arr, l, h);
		quickSort(arr, l, partitionIndex - 1);
		quickSort(arr, partitionIndex + 1, h);
	}
}

const arr = [6, 5, 8, 9, 3, 10, 15, 12, 16];
quickSort(arr);
console.log(arr);
