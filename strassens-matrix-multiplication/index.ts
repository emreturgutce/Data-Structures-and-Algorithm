function matrixMultiplication(a: number[][], b: number[][]): number[][] {
	const n = a.length;
	const c = new Array(n).fill(null).map(() => new Array<number>(n).fill(0));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			c[i][j] = 0;
			for (let k = 0; k < n; k++) {
				c[i][j] += a[i][k] * b[k][j];
			}
		}
	}

	return c;
}

const a = [
	[1, 2],
	[3, 4],
];

const b = [
	[5, 6],
	[0, 7],
];

console.log(matrixMultiplication(a, b));
