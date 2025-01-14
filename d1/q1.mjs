import { readFileSync } from 'fs';

const input = readFileSync('./d1/input.txt').toString().split('\n').slice(0, -1).map(line => line.split('   ').map(Number));

const leftArray = [];
const rightArray = [];

input.forEach(([a, b]) => {
  leftArray.push(a);
  rightArray.push(b);
});

leftArray.sort((a, b) => a - b);
rightArray.sort((a, b) => a - b);
let sum = 0;
for (let i = 0; i < leftArray.length; i++) {
  const diff = leftArray[i] - rightArray[i];
  if (diff < 0) {
    sum += -diff;
  } else {
    sum += diff;
  }
}
console.log(sum);