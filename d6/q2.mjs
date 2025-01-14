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


function isInLoop(start, step, map, callback) {
    const visitMap = new Array(rows).fill().map(() => new Array(cols).fill().map(() => ({})));
    let [i, j] = start;
    let [stepI, stepJ] = step;

    while (isInBounds(i, j)) {
        if (visitMap[i][j][[stepI, stepJ].toString()] === true) {
            return true;
        } else {
            visitMap[i][j][[stepI, stepJ].toString()] = true;
        }
        const [nextI, nextJ] = [i + stepI, j + stepJ];
        if (isInBounds(nextI, nextJ) && map[nextI][nextJ] === '#') {
            [stepI, stepJ] = [stepJ, -stepI];
        } else {
            callback?.([i, j], [stepI, stepJ], map);
            [i, j] = [nextI, nextJ];
        }
    }

    return false
}

let loopCount = 0;
let visitCount = 0;
const [si, sj] = findStart();
const visitMap = new Array(rows).fill().map(() => []);
const loopMap = new Array(rows).fill().map(() => []);
loopMap[si][sj] = true;

isInLoop([si, sj], [-1, 0], map, (position, step, map) => {
    let [i, j] = position;
    if (!visitMap[i][j]) {
        visitMap[i][j] = true;
        visitCount++;
    }

    let [stepI, stepJ] = step;
    let nextI = i + stepI, nextJ = j + stepJ;
    if (isInBounds(nextI, nextJ)) {
        const temp = map[nextI][nextJ];
        map[nextI][nextJ] = '#';
        if (!loopMap[nextI][nextJ] && isInLoop(position, step, map)) {
            loopMap[nextI][nextJ] = true;
            loopCount += 1;
        }
        map[nextI][nextJ] = temp;
    }
})

console.log(visitCount, loopCount)