function uniquePaths(w: number, h: number, memo: object = {}): number {
    const key = `${w}:${h}`;
    if (key in memo) return memo[key];
    if (w === 1 || h === 1) return (memo[key] = 1);

    return (memo[key] =
        Math.max(uniquePaths(w - 1, h, memo), uniquePaths(w, h - 1, memo)) + 1);
}

console.log(uniquePaths(5, 4));
