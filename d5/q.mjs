import { readFileSync } from 'fs';

const [rules, updates] = readFileSync('./d5/input.txt').toString().split('\n\n').map(s => s.split('\n'));

/** @type {Map<string, Set<string>>} */
const beforeMap = new Map();
rules.forEach(s => {
    const [left, right] = s.split('|');
    const set = beforeMap.get(right);
    if (set) {
        set.add(left);
    } else {
        beforeMap.set(right, new Set([left]));
    }
})

let passCount = 0;
let fixCount = 0;
updates.forEach(s => {
    const list = s.split(',');
    let before = new Set();
    let pass = true;
    for (let i = 0; i < list.length; i++) {
        if (before.has(list[i])) {
            pass = false;
            break;
        }
        before = new Set([...before, ...(beforeMap.get(list[i]) || [])]);
    }

    if (pass) {
        passCount += Number(list[Math.floor(list.length / 2)]);
    } else {
        list.sort((a, b) => {
            const aBefore = beforeMap.get(a) || new Set();
            const bBefore = beforeMap.get(b) || new Set();
            if (bBefore.has(a)) {
                return -1;
            } else if (aBefore.has(b)) {
                return 1;
            } else {
                return 0;
            }
        })
        fixCount += Number(list[Math.floor(list.length / 2)]);
    }
})

console.log(passCount, fixCount);