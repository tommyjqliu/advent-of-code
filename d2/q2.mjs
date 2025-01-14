import { readFileSync } from 'fs';

const rawInput = readFileSync('./d2/input.txt').toString();
const input = readFileSync('./d2/input.txt').toString().split('\n').map(line => line.split(' ').map(Number));

let sum = 0;

function gapValid(gap, increase) {
    return gap > 0 === increase && Math.abs(gap) > 0 && Math.abs(gap) < 4;
}

input.forEach((line) => {
    const gaps = [];
    let validPositive = 0;
    let validNegative = 0;

    for (let i = 0; i < line.length - 1; i++) {
        const gap = line[i + 1] - line[i];
        const absGap = Math.abs(gap);
        gaps.push(gap);
        if (absGap > 0 && absGap < 4) {
            if (gap > 0) {
                validPositive++;
            } else {
                validNegative++;
            }
        }
    }

    if (validPositive === gaps.length || validNegative === gaps.length) {
        sum += 1;
        return;
    }


    const maxFix = 1;
    let fixCount = 0;
    let positiveValid = true;
    let increase = true;
    for (let i = 0; i < gaps.length; i++) {
        if (!gapValid(gaps[i], increase)) {
            if (fixCount < maxFix) {
                if (i + 1 < gaps.length) {
                    const mergedGap = gaps[i] + gaps[i + 1];
                    if (gapValid(mergedGap, increase)) {
                        fixCount++;
                        i++;
                        continue;
                    }
                }

                if (i - 1 >= 0) {
                    const mergedGap = gaps[i - 1] + gaps[i];
                    if (gapValid(mergedGap, increase)) {
                        fixCount++;
                        continue;
                    }
                }
                // forget this situation
                if (i == 0 || i == gaps.length - 1) {
                    fixCount++;
                    continue;
                }

                positiveValid = false;
                break;
            } else {
                positiveValid = false;
                break;
            }
        }
    }

    fixCount = 0;
    increase = false;
    let negativeValid = true;
    for (let i = 0; i < gaps.length; i++) {
        if (!gapValid(gaps[i], increase)) {
            if (fixCount < maxFix) {
                if (i + 1 < gaps.length) {
                    const mergedGap = gaps[i] + gaps[i + 1];
                    if (gapValid(mergedGap, increase)) {
                        fixCount++;
                        i++;
                        continue;
                    }
                }

                if (i - 1 >= 0) {
                    const mergedGap = gaps[i - 1] + gaps[i];
                    if (gapValid(mergedGap, increase)) {
                        fixCount++;
                        continue;
                    }
                }

                if (i == 0 || i == gaps.length - 1) {
                    fixCount++;
                    continue;
                }
                negativeValid = false;
                break;
            } else {
                negativeValid = false;
                break;
            }
        }
    }

    const valid = positiveValid || negativeValid;
    if (valid) {
        sum += 1;
    }
    const testValid = !!line.map((x, i) => line.toSpliced(i, 1)).find(isSafe);

    if (valid != testValid) {
        console.log(line, gaps, valid, testValid);
    }
});

console.log(sum);
console.log(part2(rawInput));

function isSafe(line) {
    let result = line.map((num, i) => i > 0 && num - line[i - 1]).slice(1);
    return (
        result.every(num => num >= 1 && num <= 3) ||
        result.every(num => num <= -1 && num >= -3)
    );
}

export function part1(input) {
    let lines = input.split("\n").map(line => line.split(" ").map(Number));
    return lines.filter(isSafe).length;
}

export function part2(input) {
    let lines = input.split("\n").map(line => line.split(" ").map(Number));
    return lines.filter(line => {
        return line.map((x, i) => line.toSpliced(i, 1)).find(isSafe);
    }).length;
}

