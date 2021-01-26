function allPairsShortestPath(A: number[][]): number[][] {
	for (let k = 0; k < A.length; k++) {
		for (let i = 0; i < A.length; i++) {
			for (let j = 0; j < A.length; j++) {
				A[i][j] = Math.min(A[i][j], A[i][k] + A[k][j]);
			}
		}
	}

	return A;
}

const A = [
	[0, 3, Number.MAX_SAFE_INTEGER, 7],
	[8, 0, 2, Number.MAX_SAFE_INTEGER],
	[5, Number.MAX_SAFE_INTEGER, 0, 1],
	[2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0],
];

console.log(allPairsShortestPath(A))