function lcs(a: string, b: string, i: number, j: number) {
    if (!a[i] || !b[j]) {
        return 0;
    } else if (a[i] === b[j]) {
        return 1 + lcs(a, b, i + 1, j + 1);
    } else {
        return Math.max(lcs(a, b, i + 1, j), lcs(a, b, i, j + 1));
    }
}

console.time('lcs');
console.log(lcs('aabbcc', 'bc', 0, 0));
console.timeEnd('lcs');
