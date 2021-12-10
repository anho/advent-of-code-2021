import { readLines } from '../utils.js';

const input = readLines('10/input');

const pairs = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>'],
];
const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const getState = (line) => {
  const [head, ...tail] = line.split('');
  const state = tail.reduce(
    ({ isCorrupted, stack, lastChar }, char) => {
      if (isCorrupted) {
        return { isCorrupted, stack, lastChar };
      }

      const pair = pairs.find(p => p.includes(char));
      if (pair[0] === char) { // is opening
        return { isCorrupted, stack: [...stack, char] };
      }

      const last = stack.pop();
      if (pair[0] !== last) {
        return { isCorrupted: true, stack, lastChar: char };
      }

      return { isCorrupted, stack }
    },
    { isCorrupted: false, stack: [head] }
  );

  return state;
}

const corruptLines = input
  .map((line) => getState(line))
  .filter(({ isCorrupted }) => isCorrupted)
  .reduce(
    (sum, { lastChar }) => sum + points[lastChar],
    0
  )
;

console.log(corruptLines);
