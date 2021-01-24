function jobSequencing(profits: number[], deadlines: number[], time: number) {
    const slots: number[] = new Array(time).fill(null);

    for (let i = 0; i < profits.length; i++) {
        for (let j = deadlines[i] - 1; j >= 0; j--) {
            if (
                j < time &&
                (slots[j] === null || profits[slots[j]] < profits[i])
            ) {
                slots[j] = i;
                break;
            }
        }
    }

    return slots;
}

const profits = [20, 15, 10, 5, 1];
const deadlines = [2, 2, 1, 3, 3];
const time = 3;

console.log(jobSequencing(profits, deadlines, time));
