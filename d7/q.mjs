import { readFileSync } from 'fs';

const lines = readFileSync('./d7/input.txt').toString().split('\n')
let result = 0;

const lazyCalculation = {
    partial: 0,
    operation: [
        ["+", 1],
        ["||", 2],
        ["*", 3],
    ]
}

lines.forEach(line => {
    const [sum, remains] = line.split(": ");
    const nums = remains.split(' ').map(Number);
    let set = new Set([nums[0]]);
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        const plusSet = [...set].map(value => value + num);
        const multipleSet = [...set].map(value => value * num);
        const concatSet = [...set].map(value => Number(`${value}${num}`));
        set = new Set([...plusSet, ...multipleSet, ...concatSet]);
    }
    if (set.has(Number(sum))) {
        result += Number(sum);
    }
})

console.log(result);