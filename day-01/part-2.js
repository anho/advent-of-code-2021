import { dirname, readLines, window, sum } from '../utils.js';

const depths = readLines('01/input').map(Number);

const { numIncreased } = window(3, depths)
  .map(sum)
  .reduce(
    (acc, current) => ({
      prev: current, numIncreased: acc.numIncreased + Number(current > acc.prev)
    }),
    { prev: 0, numIncreased: -1 }
  )

console.log(numIncreased);
