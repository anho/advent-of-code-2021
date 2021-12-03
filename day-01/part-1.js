import { dirname, readLines } from '../utils.js';

const depths = readLines('01/input').map(Number);
const { numIncreased } = depths.reduce(
  (acc, current) => ({
    prev: current, numIncreased: acc.numIncreased + Number(current > acc.prev)
  }),
  { prev: 0, numIncreased: -1 }
)

console.log(numIncreased);
