function fib(n) {
    if (n <= 2) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
}

const memoFib = (n, memo = {}) => {
    if (n in memo) {
        return memo[n];
    }

    if (n <= 2) {
        return 1;
    }

    return (memo[n] = memoFib(n - 1, memo) + memoFib(n - 2, memo));
};

const n = parseInt(process.argv[2]);

let start = new Date().getTime();
process.stdout.write(`Answer: ${fib(n)}\t`);
let end = new Date().getTime();
process.stdout.write(`Took ${end - start} ms to complete\n`);

start = new Date().getTime();
process.stdout.write(`Answer: ${memoFib(n)}\t`);
end = new Date().getTime();
process.stdout.write(`Took ${end - start} ms to complete\n`);
