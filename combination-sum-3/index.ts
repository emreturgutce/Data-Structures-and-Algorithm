function combinationSum3(
	k: number,
	n: number,
	start = 1,
	res: number[][] = [],
	cur: number[] = [],
): number[][] {
	if (k == 0 && n == 0) res.push([...cur]);
	if (k == 0 || n <= 0) return res;

	for (let i = start; i <= 9; i++) {
		cur.push(i);
		combinationSum3(k - 1, n - i, i + 1, res, cur);
		cur.pop();
	}

	return res;
}

console.log(combinationSum3(3, 7));
