import { readFileSync } from 'fs';

const input = readFileSync('./d1/input.txt').toString().split('\n').slice(0, -1).map(line => line.split('   ').map(Number));

const leftArray = [];
const rightArray = [];

input.forEach(([a, b]) => {
  leftArray.push(a);
  rightArray.push(b);
});

const map = new Map();

rightArray.forEach((num) => {
  map.set(num, (map.get(num) || 0) + 1);
});

let sum = 0;

leftArray.forEach((num) => {
    const count = map.get(num);
    if (count) {
        sum += count * num;
    }
});

console.log(sum);