import { readLines, range } from '../utils.js';

const input = readLines('07/input');
const positions = input[0].split(',').map(Number);
const min = Math.min(...positions);
const max = Math.max(...positions);

const gaussSum = (n) => (n ** 2 + n) / 2;

const fuel = range(min, max).reduce(
  (fuel, position) => Math.min(positions.reduce((sum, p) => sum + gaussSum(Math.abs(p - position)), 0), fuel),
  Number.POSITIVE_INFINITY
)

console.log(fuel);
