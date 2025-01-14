import { readFileSync } from 'fs';

const map = readFileSync('./d6/example.txt').toString().split('\n')
const rows = map.length;
const cols = map[0].length;
const visitMap = new Array(rows).fill().map(() => []);
function isInBounds(i, j) {
    return i >= 0 && j >= 0 && i < rows && j < cols;
}

function findStart() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === '^') {
                return [i, j];
            }
        }
    }
    throw new Error('Start point unfound');
}

function isSameStep(step, nextStep) {
    const [i, j] = step;
    const [ni, nj] = nextStep;
    return i === ni && j === nj;
}

function reverseRecordMap(i, j, step) {
    let [stepI, stepJ] = step;
    if (isInBounds(i, j) && map[i][j] !== '#') {
        if (!visitMap[i][j]) {
            visitMap[i][j] = step;
        }
        reverseRecordMap(i - stepI, j - stepJ, step);
    }
}

let stepCount = 0;
let turnCount = 0;
let [i, j] = findStart();
let [stepI, stepJ] = [-1, 0];
let [nextI, nextJ] = [i, j];

while (isInBounds(nextI, nextJ) && turnCount < 4) {
    if (map[nextI][nextJ] === '#') {
        [stepI, stepJ] = [stepJ, -stepI];
        turnCount += 1;
    } else {
        [i, j] = [nextI, nextJ];
        turnCount = 0;
        if (!visitMap[i][j]) {
            visitMap[i][j] = [stepI, stepJ];
            stepCount += 1;
        }
    }
    [nextI, nextJ] = [i + stepI, j + stepJ];
}

console.log(stepCount, turnCount);