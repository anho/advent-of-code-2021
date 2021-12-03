import { readLines } from '../utils.js';

const input = readLines('02/input');
const movements = input.map((x) => {
  const [direction, amount] = x.split(' ');
  return {
    direction, amount: Number(amount)
  }
});

const { horizontal, depth } = movements
  .reduce(
    ({ horizontal, depth }, { direction, amount }) => ({
      horizontal: horizontal + (direction === 'forward' ? amount : 0),
      depth: depth + (direction === 'down' ? amount : direction === 'up' ? 0 - amount : 0)
    }),
    { horizontal: 0, depth: 0 }
  )

console.log(horizontal * depth);
