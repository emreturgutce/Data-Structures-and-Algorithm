function lcs(a, b) {
    if (a.length === 0 || b.length === 0) return 0;

    const remA = a[1];
    const remB = b[1];

    if (a[0] === b[0]) return 1 + lcs(remA, remB);

    return Math.max(lcs(remA, b), lcs(a, remB));
}

console.log(lcs('bdcaba', 'abcbdab'));
