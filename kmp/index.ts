function buildPatternTable(word: string): number[] {
    const patternTable = [0];
    let prefixIndex = 0;
    let suffixIndex = 1;

    while (suffixIndex < word.length) {
        if (word[prefixIndex] === word[suffixIndex]) {
            patternTable[suffixIndex] = prefixIndex + 1;
            suffixIndex++;
            prefixIndex++;
        } else if (prefixIndex === 0) {
            patternTable[suffixIndex] = 0;
            suffixIndex++;
        } else {
            prefixIndex = patternTable[prefixIndex - 1];
        }
    }

    return patternTable;
}

function knuthMorrisPratt(text: string, word: string): number {
    if (word.length === 0) return 0;

    let textIndex = 0;
    let wordIndex = 0;

    const patternTable = buildPatternTable(word);

    while (textIndex < text.length) {
        if (text[textIndex] === word[wordIndex]) {
            if (wordIndex === word.length - 1) {
                return textIndex - word.length + 1;
            }
            wordIndex++;
            textIndex++;
        } else if (wordIndex > 0) {
            wordIndex = patternTable[wordIndex - 1];
        } else {
            wordIndex = 0;
            textIndex += 1;
        }
    }

    return -1;
}

const text = 'ababd';
const word = 'abd';

console.log(knuthMorrisPratt(text, word));
