/**
 * - - A B C D G H
 * - 0 0 0 0 0 0 0
 * A 0 1 1 1 1 1 1
 * E 0 1 1 1 1 1 1
 * D 0 1 1 1 2 2 2
 * F 0 1 1 1 2 2 2
 * H 0 1 1 1 2 2 3
 * R 0 1 1 1 2 2 3
 */

function lcs(a: string, b: string): string {
    const lcsMatrix = new Array<Array<number> | null>(b.length + 1)
        .fill(null)
        .map(() => new Array<number>(a.length + 1).fill(0));

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[j - 1] === b[i - 1]) {
                lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1;
            } else {
                lcsMatrix[i][j] = Math.max(
                    lcsMatrix[i - 1][j],
                    lcsMatrix[i][j - 1],
                );
            }
        }
    }

    if (lcsMatrix[a.length][b.length] === 0) {
        return '';
    }

    let longestSequence = '';

    let i = a.length;
    let j = b.length;

    while (i > 0 || j > 0) {
        if (a[i - 1] === b[j - 1]) {
            longestSequence = a[i - 1] + longestSequence;
            i--;
            j--;
        } else if (lcsMatrix[j][i] === lcsMatrix[j][i - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return longestSequence;
}

console.log(lcs('ABCDGH', 'AEDFHR'));
