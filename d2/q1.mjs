import { readFileSync } from 'fs';

const input = readFileSync('./d2/input.txt').toString().split('\n').map(line => line.split(' ').map(Number));

let sum = 0;

input.forEach((line) => {
    if (line.length <= 2) {
        sum += 1;
        return;
    }

    const increase = (line[1] - line[0]) > 0;

    let valid = true;
    for (let i = 0; i < line.length - 1; i++) {
        const gap = line[i + 1] - line[i];
        const gapDirectionValid = gap > 0 === increase;
        const gapSizeValid = Math.abs(gap) > 0 && Math.abs(gap) < 4;
        if (!gapDirectionValid || !gapSizeValid) {
            valid = false;
            break;
        }
    }

    if (valid) {
        sum += 1;
    }
});

console.log(sum);