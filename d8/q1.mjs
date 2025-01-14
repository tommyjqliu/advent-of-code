import { readFileSync } from 'fs';

const map = readFileSync('./d8/input.txt').toString().split('\n').map(s => s.split(""));
const rows = map.length;
const cols = map[0].length;
function isInBounds(i, j) {
    return i >= 0 && j >= 0 && i < rows && j < cols;
}

/**  @type {Map<string, Array<Array<number>>} */
const locationMap = new Map();

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const symbol = map[i][j]
        if (symbol !== '.') {
            const locations = locationMap.get(symbol);
            if (!locations) {
                locationMap.set(symbol, [[i, j]]);
            } else {
                locationMap.set(symbol, [...locations, [i, j]]);
            }
        }
    }
}

function calculateAntinodes(xi, xj, yi, yj) {
    const diffI = yi - xi;
    const diffJ = yj - xj;
    const antinodeXI = xi - diffI;
    const antinodeXJ = xj - diffJ;
    const antinodeYI = yi + diffI;
    const antinodeYJ = yj + diffJ;
    let sum = 0;
    if (isInBounds()) {
        sum++;
    }
    if (isInBounds()) {
        sum++;
    }
    return [
        [antinodeXI, antinodeXJ],
        [antinodeYI, antinodeYJ],
    ];
}

let antinodes = [];
for (const locations of locationMap.values()) {
    for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            antinodes.push(...calculateAntinodes(...locations[i], ...locations[j]));
        }
    }
}

console.log([...new Set(antinodes.filter(value => isInBounds(...value)).map(String))].length);