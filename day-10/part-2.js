import { readLines } from '../utils.js';

const input = readLines('10/input');

const pairs = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>'],
];
const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
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

const getClosingBrackets = (stack) => {
  const brackets = stack.reverse().reduce(
    (acc, char) => {
      const closingBracket = pairs.find(([o]) => o === char)[1];

      return [...acc, closingBracket];
    },
    []
  );

  return brackets;
}
const getCompletionScore = (brackets) => brackets.reduce(
  (score, char) => score * 5 + points[char],
  0
)

const scores = input
  .map((line) => getState(line))
  .filter(({ isCorrupted }) => !isCorrupted)
  .map(({ stack }) => getClosingBrackets(stack))
  .map(brackets => getCompletionScore(brackets))
  .sort((a, b) => a - b)
;

console.log(scores[Math.floor(scores.length / 2)]);
