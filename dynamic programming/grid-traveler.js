function gridTraveler(n, m) {
    if (n === 0 || m === 0) {
        return 0;
    }

    if (n === 1 || m === 1) {
        return 1;
    }

    return gridTraveler(n - 1, m) + gridTraveler(n, m - 1);
}

function gridTravelerMemo(n, m, memo = {}) {
    const key = n + ',' + m;

    if (key in memo) {
        return memo[key];
    }

    if (n === 0 || m === 0) {
        return 0;
    }

    if (n === 1 || m === 1) {
        return 1;
    }

    return (memo[key] =
        gridTravelerMemo(n - 1, m, memo) + gridTravelerMemo(n, m - 1, memo));
}

const n = parseInt(process.argv[2]);
const m = parseInt(process.argv[3]);

let start = new Date().getTime();
process.stdout.write(`Answer: ${gridTraveler(n, m)}\t`);
let end = new Date().getTime();
process.stdout.write(`Took ${end - start} ms to complete\n`);

start = new Date().getTime();
process.stdout.write(`Answer: ${gridTravelerMemo(n, m)}\t`);
end = new Date().getTime();
process.stdout.write(`Took ${end - start} ms to complete\n`);
