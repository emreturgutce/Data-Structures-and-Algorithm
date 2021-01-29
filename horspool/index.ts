/**
 * Horspool algorithm for matching pattern in the given text.
 * @param text - Text that you want to search a pattern into.
 * @param pattern - Pattern you are searching for.
 * Console.logs founded occurances.
 */

function horspoolStringMatch(text: string, pattern: string): void {
	const patternLength = pattern.length;
	const stringLength = text.length;
	const badCharacterTable = new Array<number>(256).fill(-1);

	for (let i = 0; i < pattern.length; i++) {
		badCharacterTable[pattern[i].charCodeAt(0)] = i;
	}

	let i = 0;

	while (i <= stringLength - patternLength) {
		let j = patternLength - 1;

		while (j >= 0 && pattern[j] === text[i + j]) j--;

		if (j < 0) {
			console.log(`pattern found at index ${i}`);

			i +=
				i + patternLength < stringLength
					? patternLength -
					  badCharacterTable[text[i + patternLength].charCodeAt(0)]
					: 1;
		} else {
			i += Math.max(1, j - badCharacterTable[text[i + j].charCodeAt(0)]);
		}
	}
}

horspoolStringMatch('trust hard tooth brushes', 'tooth');
