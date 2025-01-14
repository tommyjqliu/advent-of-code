import { readFileSync } from 'fs';

const input = readFileSync('./d4/input.txt').toString().split('\n');
const rows = input.length;
const cols = input[0].length;

let count = 0;

function isInBounds(i, j) {
    return i >= 0 && j >= 0 && i < rows && j < cols;
}


function readWord(word, count, current, step) {

    if (count === word.length) {
        return 1;
    }

    const [i, j] = current;
    if (!isInBounds(i, j)) {
        return 0;
    }

    const char = input[i][j];
    if (char === word[count]) {
        const [shiftI, shiftJ] = step;
        return readWord(word, count + 1, [i + shiftI, j + shiftJ], step)
    }

    return 0;
}
// part 1
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const result = [
            readWord('XMAS', 0, [i, j], [1, 0]),
            readWord('XMAS', 0, [i, j], [0, 1]),
            readWord('XMAS', 0, [i, j], [-1, 0]),
            readWord('XMAS', 0, [i, j], [0, -1]),
            readWord('XMAS', 0, [i, j], [1, 1]),
            readWord('XMAS', 0, [i, j], [1, -1]),
            readWord('XMAS', 0, [i, j], [-1, 1]),
            readWord('XMAS', 0, [i, j], [-1, -1]),
        ].reduce((previous, current) => previous + current);
        count += result;
    }
}

console.log(count);

function tryRead(i, j) {
    if (isInBounds(i, j)) {
        return input[i][j];
    }
    return null;
}

function readX(i, j) {
    const result = [
        tryRead(i, j),
        tryRead(i, j + 2),
        tryRead(i + 1, j + 1),
        tryRead(i + 2, j),
        tryRead(i + 2, j + 2),
    ];

    if (result.findIndex(v => v === null) !== -1) {
        return null;
    }

    return result.join("");
}

let part2Count = 0;
// part 2
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const result = readX(i, j);
        if (result !== null) {
            part2Count += ["MMASS", "MSAMS", "SSAMM", "SMASM"].reduce((count, word) => word === result ? count + 1 : count, 0);
        }
    }
}

console.log(part2Count);