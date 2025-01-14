import { readFileSync } from 'fs';

const input = readFileSync('./d3/input.txt').toString();
let sum = 0;
let enable = true;

function mulBegin(char, x, y) {
    if (char === 'm') {
        return readU;
    }
    return mulBegin;
}

function readU(char, x, y) {
    if (char === 'u') {
        return readL;
    }
    return mulBegin;
}

function readL(char, x, y) {
    if (char === 'l') {
        return readLeft;
    }
    return mulBegin;
}

function readLeft(char, x, y) {
    if (char === '(') {
        return readX;
    }
    return mulBegin;
}

function readX(char, x = 0, y = 0) {
    if (/[\d]/.test(char)) {
        const nextX = x * 10 + parseInt(char);
        return (c) => readX(c, nextX);
    } else if (char === ',') {
        return (c) => readY(c, x);
    }
    return mulBegin;
}

function readY(char, x = 0, y = 0) {
    if (/[\d]/.test(char)) {
        const nextY = y * 10 + parseInt(char);
        return (c) => readY(c, x, nextY);
    } else if (char === ')' && enable) {
        sum += x * y;
    }
    return mulBegin;
}

function wordHandlerFactory(word, callback) {
    function wordHandler(char, count = 0) {
        if (char === word[count]) {
            if (count === word.length - 1) {
                callback();
                return (c) => wordHandler(c, 0);
            }
            return (c) => wordHandler(c, count + 1);
        } else {
            return (c) => wordHandler(c, 0);
        }
    }
    return wordHandler;
}
// q1
let handlers = [mulBegin];
for (let i = 0; i < input.length; i++) {
    handlers = handlers.map((handler) => handler(input[i]));
}

console.log(sum);

// q2
handlers = [mulBegin, wordHandlerFactory("do()", () => enable = true), wordHandlerFactory("don't()", () => enable = false)];
for (let i = 0; i < input.length; i++) {
    handlers = handlers.map((handler) => handler(input[i]));
}

console.log(sum);