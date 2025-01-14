import { readFileSync } from 'fs';

const map = readFileSync('./d6/input.txt').toString().split('\n').map(s => s.split(""));
const rows = map.length;
const cols = map[0].length;

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

/** @type {()=>[Boolean, Set<string>]} */
function visit(start, step, map) {
    /** @type {Set<string>} */
    const visitSet = new Set();
    let [i, j] = start;
    let [stepI, stepJ] = step;

    while (isInBounds(i, j)) {
        if (visitSet.has([i, j, stepI, stepJ].join(','))) {
            return [true, visitSet];
        } else {
            visitSet.add([i, j, stepI, stepJ].join(','))
        }
        const [nextI, nextJ] = [i + stepI, j + stepJ];
        if (isInBounds(nextI, nextJ) && map[nextI][nextJ] === '#') {
            [stepI, stepJ] = [stepJ, -stepI];
        } else {
            [i, j] = [nextI, nextJ];
        }
    }

    return [false, visitSet];
}


const [si, sj] = findStart();
const [hasLoop, visitSet] = visit([si, sj], [-1, 0], map)
let loopCount = 0;
let visitCount = 0;
const set = new Set();
for (const value of visitSet) {
    const [i, j, stepI, stepJ] = value.split(',').map(Number);
    if (set.has([i, j].join(','))) {
        continue;
    } else {
        set.add([i, j].join(','));
        visitCount += 1;
    }

    if (i === si && j === sj) {
        continue;
    } else {
        map[i][j] = "#";
        const [hasLoop, visitSet] = visit([si, sj], [-1, 0], map)
        if (hasLoop) {
            loopCount += 1;
        }
        map[i][j] = ".";
    }
}

console.log(visitCount,loopCount);